import { useState, useEffect } from 'react';
// import Persons from './components/Persons';
// import Filter from './components/Filter';
import Bills from './components/Bills';
import BillForm from './components/BillForm';  //el viejo 'PersonForm'
import billsService from './services/bills-service';
import Notification from './components/Notification';


const App = () => {

  // Hooks:
  const [bills, setBills] = useState([]); // el viejo 'persons-setPersons'
  const [newCategory, setNewCategory] = useState(''); // el viejo 'newName.setNewName'
  const [newDescription, setNewDescription] = useState(''); // el viejo 'newName.setNewName'
  const [newNumber, setNewNumber] = useState('');

  /*
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('put a new name...');
  */
  
  // const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState();

  useEffect(() => {
    billsService
      .getAll()
      .then(initialBills => {
        setBills(initialBills)
      })
  }, [])

  const addBill = (event) => {
    event.preventDefault()
    const billObject = { Category: newCategory,Description: newDescription, number: newNumber};
    
    billsService
    .create(billObject)
      .then(returnedBill => {
        setBills([...bills,returnedBill]);
        setNewCategory('');
        setNewDescription('');
        setNewNumber('');
        
        setTypeMessage(true);
        setMessage(`Added '${newDescription}'`);
        setTimeout(() => {setMessage(null)}, 5000);
      })
  }
  

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  }
 
  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }


  return (
    <div>

      <h2>My Money Stats WebApp</h2>
      <Notification message={message} messageType={typeMessage}/>
            
      <BillForm 
        addBill={addBill} 
        newCategory={newCategory} 
        handleCategoryChange={handleCategoryChange} 
        newDescription = {newDescription}
        handleDescriptioChange={handleDescriptionChange}
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h2>Bills</h2>

      <Bills bills={bills}/>

    </div>
  )
}

export default App