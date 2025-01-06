const BillForm = (props) => {
  return (
    <>
      <form onSubmit={props.addBill} className="billForm">
        <h3>Add a new bill:</h3>
        <div className="form_date">
          <span>Date:</span>
          <span>
            <input type="date" value={props.newDate} onChange={props.handleDateChange} />
          </span>        
        </div>
        <div className="form_category">
          <span>Category:</span>
          <span>
            <input type="text" maxLength="20" value={props.newCategory} onChange={props.handleCategoryChange} />
          </span>        
        </div>
        <div className="form_description">
          <span>Description:</span>
          <span>
            <input type="text" maxLength="30" value={props.newDescription} onChange={props.handleDescriptioChange} />
          </span>  
        </div>
        <div className="form_amount">
          <span>Amount:&nbsp;&nbsp;&#91;&nbsp;€&nbsp;&#93;</span>
          <span>
            <input type="number" min="1" step="any" value={props.newAmount} onChange={props.handleAmountChange} />
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