const Bills = (props) => {

  var total = props.bills.reduce(function(sum, bill) {
    return sum + parseInt(bill.number)
  },0)

  return (
    <>
      <h3>Total is: € <b>{total}</b>.-</h3>
      <h4>My Bills:</h4>

      <div className="bill-border">

        <div className="bill-header">
          <span>Category</span>
          <span>Description</span>
          <span>Amount</span>
          <span></span>
        </div>

        <ul className="bills-list">
          {props.bills.map(bill =>
            <li key={bill.id} className="bill-item"> 
              <div className="bill-row">
                <span>{bill.category}</span>
                <span>{bill.description}</span>
                <span>{bill.number}</span>
                <button onClick={() => props.handleDelete(bill.id,bill.description)}>Delete</button>
              </div>
            </li>
          )}
        </ul>

      </div>
    </>
  )
}

export default Bills