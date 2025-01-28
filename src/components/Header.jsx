const Header = (props) => {
  const username = props.user.username
  return (
    <div className="div_headerForm">
      <form onSubmit={props.handleLogout} className="headerForm">
        <p style={{ flexGrow: '1'}}>{props.currentDate}</p>
        <p style={{ flexGrow: '2'}} id="username">{username}</p>
        <button style={{ flexGrow: '2'}} type="submit">Logout</button>
      </form>
    </div>

  )
}

export default Header

/*

  return (
    <form onSubmit={props.handleLogout} className="headerForm">

      <div className="date_div">
        <p>{props.currentDate}</p> 
      </div>

      <div className="user_div">
        <p id="username">{username}</p>
      </div>

      <div className="form_button_header">
        <button type="submit">Logout</button>
      </div>

    </form>
  )

*/
