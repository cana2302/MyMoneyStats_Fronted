const Filter = (props) => {
  return (
    <>
      <p>
        Filter shown with: 
        <span> 
          <input value={props.newFilter} onChange={props.handleFilterChange} />
        </span>
      </p>
    </>
  )
}

export default Filter