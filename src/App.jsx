import { useState, useEffect } from 'react';

import Bills from './components/Bills';
import BillForm from './components/BillForm';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import CreateUserForm from './components/CreateUser';
import Notification from './components/Notification';
import LoadingDots from './components/Loading';

import billsService from './services/bills-service';
import loginService from './services/login'
import logoutService from './services/logout'
import sessionService from './services/session';
import userService from './services/user'

const App = () => {

  const currentDate = new Date();
  const currentDateString = currentDate.toDateString();
  const formattedDate = currentDate.toISOString().split('T')[0]; // Esto te da la fecha en formato yyyy-MM-dd

  // Hooks:
  const [bills, setBills] = useState([]); 
  const [newDate, setNewDate] = useState(formattedDate);
  const [newCategory, setNewCategory] = useState(''); 
  const [newDescription, setNewDescription] = useState(''); 
  const [newAmount, setNewAmount] = useState('');

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('') 
  const [password1, setPassword1] = useState('')
  const [code, setCode] = useState('')
  const [register, setRegister] = useState(false)
  const [show, setShow] = useState(false)

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState();

  useEffect(() => {
    sessionService
      .getSession()
      .then((user)=>{setUser(user)})  // Object { id: "678828c363011448e3384", username: "can222", role: "user" }
      .catch(() => {
        console.log('No sesion')
      });
  }, []);

  useEffect(() => {
    if (user !== null) {
      setIsLoading(true);
      billsService
        .getAll()
        .then(initialBills => {
          setBills(initialBills)
          setIsLoading(false)
        })
        .catch(() => {
          console.log('No sesion')
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
        setTimeout(() => {setMessage(null)}, 5000);
      })
  };

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      
      setUser(user)
      setUsername('')
      setPassword('')
      setShow(false)

      setTypeMessage(true);
      setMessage(`Authorized`);
      setTimeout(() => {setMessage(null)}, 5000);
    } catch {
      setTypeMessage(false);
      setMessage(`Wrong credentials`);
      setTimeout(() => {setMessage(null)}, 5000);
    }
  }

  const handleRegister = (event) => {
    event.preventDefault()
    setRegister(true)
  }

  const handleCreateUser = async (event) => {
    event.preventDefault()

    if (password === password1){
      try {
        const user = await userService.createUser({ username, email, password, code })
      
        setUser(user)
        setEmail('')
        setRegister(false)
        setShow(true)
  
        setTypeMessage(true);
        setMessage(`Created user`);
        setTimeout(() => {setMessage(null)}, 5000);
      } catch (error) {
        if (error.response && error.response.status) {
          switch (error.response.status) {
            case 409:
              setMessage('username already exist. Choose anothe');
              break;
            case 400:
              setMessage('wrong authorization code');
              break;
            default:
              setMessage('Something happen. Please try again');
              break;
          }
        } else {
          setMessage('Something happen. Please try again');
        }
        setTypeMessage(false); 
        setTimeout(() => { setMessage(null); }, 6000);
      }
      /*
      if (message === 'Created user') {

        try {
          const user = await loginService.login({ username, password })
          setUser(user)
          setUsername('')
          setPassword('')
          setCode('')
        } catch {
          setTypeMessage(false);
          setMessage(`Wrong credentials`);
          setTimeout(() => {setMessage(null)}, 5000);
        }
      }*/

    } else if (password !== password1) {
      setTypeMessage(false);
      setMessage(`The password must be the same`);
      setTimeout(() => {setMessage(null)}, 5000);
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
          setTimeout(() => {setMessage(null)}, 5000);

          setBills(bills.filter(bill => bill.id !== bill_id));
        })
    }
  }

  const handleBack = () => {
    setRegister(false)
    setUsername('')
    setEmail('')
    setPassword('')
    setPassword1('')
    setCode('')
    setMessage(null)
  }

  return (
    <div className="app">

      <h2>My Money Stats - WebApp</h2>
      <Notification message={message} messageType={typeMessage}/>

      { user === null && register === false || show === true ? 
        <LoginForm 
          handleLogin={handleLogin} 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword}
          handleRegister={handleRegister} /> : null  
      }

      { user === null && register === false ? 
        <RegisterForm handleRegister={handleRegister} /> : null }

      { register && user === null ? 
        <CreateUserForm
          handleCreateUser={handleCreateUser}
          username={username} 
          setUsername={setUsername}
          email={email}
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword}
          password1={password1}
          setPassword1={setPassword1}
          code={code}
          setCode={setCode}
        /> : null }

      { register && user === null ? <button onClick={handleBack} className='backButton'>Back</button> : null }

      { user !== null && show === false ? 
        <Header 
          handleLogout={handleLogout} 
          user={user}
          currentDate={currentDateString}/>: null   
      }

      { user === null || show === true ? null :
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

      { isLoading === true && show === false ? < LoadingDots isLoading={isLoading}/>  : null }

      { user === null || show === true ? null :<Bills bills={bills} handleDelete={handleDelete}/>}
      { user === null ? <p>{currentDateString}</p> : null }
      <br/><br/>
      <p>____________________________</p>
      <p id='email'>developer contact: fcanavese@protonmail.com</p>

    </div>
  )
};

export default App