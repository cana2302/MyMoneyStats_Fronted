const LoginForm = (props) => {
  return (
      <form onSubmit={props.handleLogin} className="loginForm">
        <h3>Login</h3>
        <div className="form_login">
        <span>Username:&nbsp;</span>
        <span>
          <input type="text" value={props.username} name="Username" onChange={({ target }) => props.setUsername(target.value.toLowerCase())} required/>
        </span>   
      </div>
      <div className="form_login">
        <span>Password:&nbsp;</span>
        <span>
          <input type="password" value={props.password} name="Password" onChange={({ target }) => props.setPassword(target.value)} required/>
        </span>
      </div>
      <div className="form_login_button">
        <button type="submit">Sign in</button>
        </div>
      </form>
  )
}

export default LoginForm