const Bills = (props) => {

  var total = props.bills.reduce(function(sum, bill) {
    return sum + parseInt(bill.number)
  },0)

  return (
    <>
      <h3>Total is: € <b>{total}</b>.-</h3>
      <h4>My Bills:</h4>
      <ul>
        {props.bills.map(bill =>
          <li key={bill.id}>
            {bill.category}&nbsp;{bill.description}&nbsp;&nbsp;{bill.number}&nbsp;&nbsp;
            <button onClick={() => props.handleDelete(bill.id,bill.description)}>Delete</button>
          </li>
        )}
      </ul>
    </>
  )
}

export default Bills