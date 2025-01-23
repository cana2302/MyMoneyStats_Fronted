const Header = (props) => {
  const username = props.user.username
  return (
    <form onSubmit={props.handleLogout} className="headerForm">
      <div className="date_div">
        <span><p>{props.currentDate}</p></span>   
      </div>
      <div className="user_div">
        <span><p>user:</p></span>
        <span id="username"><p>{username}</p></span>   
      </div>
      <div className="form_button_header">
        <button type="submit">Logout</button>
      </div>
    </form>
  )
}

export default Header