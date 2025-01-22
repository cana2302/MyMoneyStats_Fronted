const Header = (props) => {
  return (
    <form onSubmit={props.handleLogout} className="billForm">
      <div className="form_date">
        <span>Username:</span>
        <span><p>{props.username}</p></span>   
      </div>
      <div className="form_button">
        <button type="submit">Logout</button>
      </div>
    </form>
  )
}

export default Header