import { useState, useEffect } from 'react';

import Bills from './components/Bills';
import BillForm from './components/BillForm';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import billsService from './services/bills-service';
import loginService from './services/login'
import logoutService from './services/logout'
import sessionService from './services/session';
import Notification from './components/Notification';
import LoadingDots from './components/Loading';

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

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState();

  useEffect(() => {
    sessionService
      .getSession()
      .then((user)=>{setUser(user)})  // Object { id: "678828c363011448e3384", username: "can222", role: "user" }
      .catch(error => {
        console.log('Error fetching session:', error);
      });
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      billsService
        .getAll()
        .then(initialBills => {
          setBills(initialBills)
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Error fetching, no token:', error);
        });
    } else {
      setBills([])
    }
  }, [user]);

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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      
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

  const handleLogout = async (event) => {
    event.preventDefault()
    await logoutService.logout()
    setUser(null)
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

      { user === null ? 
        <LoginForm 
          handleLogin={handleLogin} 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword}/> : null  
      }

      { user !== null ? 
        <Header 
          handleLogout={handleLogout} 
          user={user}/>: null
      }

      <LoadingDots isLoading={isLoading} />

      { user === null ? null :
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
        />}
      
      { user === null ? null :
        <Bills bills={bills} handleDelete={handleDelete}/>
      }
      <p>{currentDate}</p>

    </div>
  )
};

export default App