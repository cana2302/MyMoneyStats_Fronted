import { useState, useEffect } from 'react';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin} className="loginForm">
      <h3>Login</h3>
      <div className="form_date">
        <span>Username:</span>
        <span>
          <input type="text" value={props.username} name="Username" onChange={({ target }) => props.setUsername(target.value.toLowerCase())} />
        </span>   
      </div>
      <div className="form_date">
        <span>Password:</span>
        <span>
          <input type="password" value={props.password} name="Password" onChange={({ target }) => props.setPassword(target.value)} />
        </span>
      </div>
      <div className="form_button">
        <button type="submit">Sign in</button>
      </div>
    </form>
  )
}

export default LoginForm