import { useState, useEffect } from 'react';

import Bills from './components/Bills';
import BillForm from './components/BillForm';
import billsService from './services/bills-service';
import loginService from './services/login'
import Notification from './components/Notification';

const App = () => {

  // Hooks:
  const [bills, setBills] = useState([]); 
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState(''); 
  const [newDescription, setNewDescription] = useState(''); 
  const [newAmount, setNewAmount] = useState('');

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 

  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState();

  

  useEffect(() => {
    billsService
      .getAll()
      .then(initialBills => {
        setBills(initialBills)
      })
  }, []);

  const addBill = (event) => {
    event.preventDefault()
    const billObject = { date: newDate, category: newCategory, description: newDescription, amount: newAmount };
    
    billsService
    .create(billObject)
      .then(returnedBill => {
        setBills([...bills,returnedBill]);
        setNewDate('');
        setNewCategory('');
        setNewDescription('');
        setNewAmount('');
        
        setTypeMessage(true);
        setMessage(`Added '${newDescription}'`);
        setTimeout(() => {setMessage(null)}, 8000);
      })
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      
      setTypeMessage(true);
      setMessage(`Authorized`);
      setTimeout(() => {setMessage(null)}, 8000);
    } catch {
      setTypeMessage(false);
      setMessage(`Wrong credentials`);
      setTimeout(() => {setMessage(null)}, 8000);
    }
  }

  const handleDateChange = (event) => {
    setNewDate(event.target.value);
  };
  
  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };
 
  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setNewAmount(event.target.value);
  };

  const handleDelete = (bill_id,bill_description) => {
    if (window.confirm(`Delete ${bill_description}?`)) {
      billsService._delete(bill_id)
        .then(() => {
          setTypeMessage(true);
          setMessage(`Deleted '${bill_description}' from stats`);
          setTimeout(() => {setMessage(null)}, 8000);

          setBills(bills.filter(bill => bill.id !== bill_id));
        })
    }
  }

  const currentDate = new Date().toDateString();

  return (
    <div>

      <h2>My Money Stats - WebApp</h2>
      <Notification message={message} messageType={typeMessage}/>

      { user === null ? loginForm() : 
        <div>
          <p>{user.usernamename} logged-in</p>
        </div>
      }
       
      <BillForm 
        addBill={addBill}
        newDate={newDate}
        handleDateChange={handleDateChange} 
        newCategory={newCategory} 
        handleCategoryChange={handleCategoryChange} 
        newDescription = {newDescription}
        handleDescriptioChange={handleDescriptionChange}
        newAmount={newAmount} 
        handleAmountChange={handleAmountChange}
      />

      <Bills bills={bills} handleDelete={handleDelete}/>

      <p>{currentDate}</p>

    </div>
  )
};

export default App