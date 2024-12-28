const Bills = (props) => {

  return (
    <ul>
      {props.bills.map(bill =>
        <li key={bill.id}>
          {bill.category}&nbsp;{bill.description}&nbsp;&nbsp;{bill.number}&nbsp;&nbsp;
          <button onClick={() => props.handleDelete(bill.id,bill.description)}>Delete</button>
        </li>
      )}
    </ul>
  )
}

export default Bills