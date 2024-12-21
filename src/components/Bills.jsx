const Bills = (props) => {

  return (
    <ul>
      {props.bills.map(bill =>
        <li key={bill.id}>
          {bill.category}&nbsp;{bill.description}&nbsp;&nbsp;{bill.number}&nbsp;&nbsp;
        </li>
      )}
    </ul>
  )
}

export default Bills