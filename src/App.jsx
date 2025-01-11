import { useState, useEffect } from 'react';

import Bills from './components/Bills';
import BillForm from './components/BillForm';
import billsService from './services/bills-service';
import Notification from './components/Notification';


const App = () => {

  // Hooks:
  const [bills, setBills] = useState([]); 
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState(''); 
  const [newDescription, setNewDescription] = useState(''); 
  const [newAmount, setNewAmount] = useState('');

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