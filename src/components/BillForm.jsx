const BillForm = (props) => {
  return (
    <>
      <form onSubmit={props.addBill} className="billForm">
        <h3>Add a new bill:</h3>
        <div className="form_category">
          <span>Category:</span>
          <span>
            <input value={props.newCategory} onChange={props.handleCategoryChange} />
          </span>        
        </div>
        <div className="form_description">
          <span>Description:</span>
          <span>
            <input value={props.newDescription} onChange={props.handleDescriptioChange} />
          </span>  
        </div>
        <div className="form_number">
          <span>Number:</span>
          <span>
            <input value={props.newNumber} onChange={props.handleNumberChange} />
          </span>        
        </div>        
        <div className="form_button">
            <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

export default BillForm