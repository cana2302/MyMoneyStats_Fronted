import { useState, useEffect } from 'react';

import Bills from './components/Bills';
import BillForm from './components/BillForm';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import CreateUserForm from './components/CreateUser';
import Notification from './components/Notification';
import LoadingDots from './components/Loading';
import CategoryBillForm from './components/CategoryForm';

import billsService from './services/bills-service';
import loginService from './services/login'
import logoutService from './services/logout'
import sessionService from './services/session';
import userService from './services/user'

const App = () => {

  const currentDate = new Date();
  const currentDateString = currentDate.toDateString();
  let formattedDate = currentDate.toISOString().split('T')[0]; // Esto te da la fecha en formato yyyy-MM-dd

  let current_year = formattedDate.split('-')[0];
  let current_month = formattedDate.split('-')[1];

  const [monthToSearch, setMonthToSearch] = useState(current_month) 
  const [monthsArray, setMonthsArray] = useState([])
  const [yearToSearch, setYearToSearch] = useState(current_year)
  const [yearsArray, setYearsArray] = useState([])


  const handleYearChangeSelect = (event) => {
    setYearToSearch(event.target.value); // Guarda el valor del año seleccionado
  };

  const handleMonthChangeSelect = (event) => {
    setMonthToSearch(event.target.value); // Guarda el valor del mes seleccionado
  };

  const handleSearchBills = () => {
    searchBills(yearToSearch, monthToSearch);
  };
  
  const handleBackButton = () => {

    if (monthToSearch === '01') {
      const monthBack = '12'
      const yearBack = Number(yearToSearch) - 1
      setMonthToSearch(monthBack.toString())
      setYearToSearch(yearBack.toString())
      searchBills(yearToSearch, monthToSearch) //
    } else if (monthToSearch === '10' || monthToSearch === '09' || monthToSearch === '08' || monthToSearch === '07' || monthToSearch === '06' || monthToSearch === '05' || monthToSearch === '04' || monthToSearch === '03' || monthToSearch === '02'){
      const monthBack = Number(monthToSearch) - 1
      setMonthToSearch('0'+monthBack.toString())
      searchBills(yearToSearch, monthToSearch) //
    } else if (monthToSearch === '12' || monthToSearch === '11'){
      const monthBack = Number(monthToSearch) - 1
      setMonthToSearch(monthBack.toString())
      searchBills(yearToSearch, monthToSearch) //
    }
    // searchBills(yearToSearch, monthToSearch)
  }

  const handleNextButton = () => {
    if (monthToSearch === '12') {
      const monthNext = '01'
      const yearNext = Number(yearToSearch) + 1
      setMonthToSearch(monthNext.toString())
      setYearToSearch(yearNext.toString())
    } else if (monthToSearch === '01' || monthToSearch === '02' || monthToSearch === '03' || monthToSearch === '04' || monthToSearch === '05' || monthToSearch === '06' || monthToSearch === '07' || monthToSearch === '08'){
      const monthNext = Number(monthToSearch) + 1
      setMonthToSearch('0'+monthNext.toString())
    } else if (monthToSearch === '09' || monthToSearch === '10' || monthToSearch === '11') {
      const monthNext = Number(monthToSearch) + 1
      setMonthToSearch(monthNext.toString())
    }
    searchBills(yearToSearch, monthToSearch)
  }

  const searchBills = async (year, month) => {
    try {
      setIsLoading(true)
      const allBills = await billsService.getAll()
      const filteredBills = allBills.filter(bill => {
        const billYear = bill.date.split('-')[0]; // Extrae el año de cada objeto
        const billMonth = bill.date.split('-')[1]; // Extrae el mes de cada objeto
        return billYear === year && billMonth === month;
      });
      setBills(filteredBills)
      setIsLoading(false)  
    } catch (error) {
      console.log('Error when loading Bills and Categories')
      setIsLoading(false)
    } 
  }

  useEffect(() => {
    searchBills(yearToSearch, monthToSearch);
  }, [yearToSearch, monthToSearch]);

  /* TODO:
  /* Agregar flechas para desplegar o contraer los divs Category y Add new bill*/

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

  const [categories, setCategories] = useState([])
  const [newCategory_, setNewCategory_] = useState('')


  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await sessionService.getSession();
        setUser(userSession);  // Object { id: "678828c363011448e3384", username: "can222", role: "user" }
      } catch (error) {
        console.log('No sesion');
      }
    };
    checkSession(); // Se ejecuta solo cuando el componente se monta
  }, []);

  useEffect(() => {
    if (user) {          // Solo ejecuta si hay un usuario presente
      const getSessionAndBills = async () => {
        try {
          setIsLoading(true)
          const allBills = await billsService.getAll()

          const filteredBills = allBills.filter(bill => {
            const billYear = bill.date.split('-')[0]; // Extrae el año de cada objeto
            const billMonth = bill.date.split('-')[1]; // Extrae el mes de cada objeto
            return billYear === current_year && billMonth === current_month;
          });

          setBills(filteredBills)
          const uniqueCategories = [...new Set(allBills.map(bill => bill.category))]
          setCategories(uniqueCategories)
          const uniqueYears = [...new Set(allBills.map(year => year.date.split('-')[0]))]
          setYearsArray(uniqueYears)
          const uniqueMonths = [...new Set(allBills.map(month => month.date.split('-')[1]))]
          setMonthsArray(uniqueMonths)
          setIsLoading(false)          
        } catch (error) {
          console.log('Error when loading Bills and Categories')
          setIsLoading(false)
        } 
      }
    getSessionAndBills()
    } 
  }, [user]) // al cambiar de usuario se vuelve a ejecutar

  const addBill = (event) => {
    event.preventDefault()
    const billObject = { date: newDate, category: newCategory, description: newDescription, amount: newAmount };
    
    billsService
    .create(billObject)
      .then(returnedBill => {
        setBills([...bills,returnedBill]);
        setNewDate(formattedDate);
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
        setTimeout(() => { setMessage(null); }, 5000);
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
    setBills([])
    setMonthToSearch(current_month)
    setYearToSearch(current_year)
    setYearsArray([])
    setMonthsArray([])
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

  const handleCategoryChange_ = (event) => {
    setNewCategory_(event.target.value);
  };

  const addCategory = (event) => {
    event.preventDefault() // Evita que la página se recargue al enviar el formulario
    if (newCategory_.trim() !== '') { // Verifica que el valor no esté vacío
      setCategories([...categories, newCategory_]); // Agrega la nueva categoría al estado
      setNewCategory_(''); // Limpia el input después de agregar la categoría
    }
  }

  const deleteCategory = (indexToDelete) => {
    setCategories(categories.filter((_, index) => index !== indexToDelete))
  }

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
      { user !== null && show === false ? 
        <Header 
          handleLogout={handleLogout} 
          user={user}
          currentDate={currentDateString}/>: null   
      }
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


      { user === null || show === true ? null :
        <CategoryBillForm 
          addCategory={addCategory}
          newCategory_={newCategory_}
          handleCategoryChange_={handleCategoryChange_}
          categories={categories}
          deleteCategory={deleteCategory}
        />}

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
          categories={categories}
        />}

      { isLoading === true && show === false ? < LoadingDots isLoading={isLoading}/> : null }

      { user === null || show === true ? null :
        <Bills 
          bills={bills}
          handleDelete={handleDelete}
          handleYearChangeSelect = {handleYearChangeSelect}
          handleMonthChangeSelect = {handleMonthChangeSelect}
          yearToSearch = {yearToSearch}
          monthToSearch = {monthToSearch}
          yearsArray = {yearsArray}
          monthsArray = {monthsArray}
          handleSearchBills = {handleSearchBills}
          handleBackButton = {handleBackButton}
          handleNextButton = {handleNextButton}
        />
      }

      { user === null ? <p>{currentDateString}</p> : null }
      <br/><br/>
      <p>____________________________</p>
      <p id='email'>developer contact: fcanavese@protonmail.com</p>

    </div>
  )
};

export default App


/*
{ isLoading === true && show === false ? < LoadingDots isLoading={isLoading}/>  : null }

{ user === null || show === true ? null :

*/