const Bills = (props) => {
  
  var total = props.bills.reduce(function(sum, bill) {
    return sum + parseFloat(bill.amount.toString()); // Convertir a número
  }, 0);

  return (
    <div className="billsDiv">
      <h3>Total is: € <b>{total.toFixed(2)}</b>.-</h3>
      <h4>My Bills:</h4>

      <div className="search_bills">
        <button id='back_button' onClick={props.handleBackButton}>&lt;</button>
        <div className="search_bills_son">
          <select name="monthSelect" value={props.monthToSearch} onChange={props.handleMonthChangeSelect}>
            <option value={props.monthToSearch}>{props.monthToSearch}</option>
            {props.monthsArray.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <select name="yearSelect" value={props.yearToSearch} onChange={props.handleYearChangeSelect}>
            <option value={props.yearToSearch}>{props.yearToSearch}</option>
            {props.yearsArray.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
          <button onClick={props.handleSearchBills}>Search</button>
        </div>
        <button id='next_button' onClick={props.handleNextButton}>&gt;</button>
      </div>

      <div className="bill-border">

        <div className="bill-header">
          <span>Date</span>
          <span>Category</span>
          <span>Description</span>
          <span>Amount</span>
          <span></span>
        </div>

        <ul className="bills-list">
          {props.bills.map(bill =>
            <li key={bill.id} className="bill-item"> 
              <div className="bill-row">
                <span>{bill.date}</span>
                <span>{bill.category}</span>
                <span>{bill.description}</span>
                <span>{bill.amount}&nbsp;€</span>
                <button onClick={() => props.handleDelete(bill.id,bill.description)}>Delete</button>
              </div>
            </li>
          )}
        </ul>

      </div>
    </div>
  )
}

export default Bills