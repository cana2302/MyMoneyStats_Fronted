const CategoryBillForm = (props) => {

  return (
    <div className="categoryForm">
      <h3>Categories</h3>
      <form onSubmit={props.addCategory} className="form_category_input">
        <input type="text" value={props.newCategory_} onChange={props.handleCategoryChange_} placeholder=" New category" />
        <button type="submit">Add</button>                
      </form>
      <div className="list_category_father">
        {props.categories.map((category, index) => (
          <div key={index} className="list_category">
            <p>-&nbsp;{category}</p>
            <button onClick={() => props.deleteCategory(index)}>Delete</button>
          </div>
          ))}   
      </div>
    </div>
  )
}

export default CategoryBillForm