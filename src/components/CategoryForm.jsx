const CategoryBillForm = (props) => {

  return (
    <>
      <form onSubmit={props.addCategory} className="billForm">
        <h3>Add a new category</h3>
        <div className="form_date">
          <span>Category name:</span>
          <span>
            <input type="date" value={props.newCategory_} onChange={props.handleCategoryChange_} />
          </span>        
        </div>              
        <div className="form_button">
            <button type="submit">Add</button>
        </div>
      </form>

      <div className="form_category">
        <span>Categories:</span>
        <span> { props.categories.map((category) => (<p>{category}</p>)) } </span>        
      </div>
    </>
  )
}

export default CategoryBillForm