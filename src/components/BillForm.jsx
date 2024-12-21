const BillForm = (props) => {
  return (
    <>
      <form onSubmit={props.addBill}>
        <h3>Add a new bill:</h3>
        <div>
          Category: 
          <input value={props.newCategory} onChange={props.handleCategoryChange} />
        </div>
        <div>
          Description: 
          <input value={props.newDescription} onChange={props.handleDescriptionChange} />
        </div>
        <div>
          Number: 
          <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>        
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

export default BillForm