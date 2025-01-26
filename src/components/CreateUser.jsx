const CreateUserForm = (props) => {
  return (
    <form onSubmit={props.handleCreateUser} className="loginForm">
      <h3>New User</h3>
      <div className="form_date">
        <span>Username:</span>
        <span>
          <input type="text" value={props.username} name="Username" onChange={({ target }) => props.setUsername(target.value.toLowerCase())} required/>
        </span>   
      </div>
      <div className="form_date">
        <span>Email:</span>
        <span>
          <input type="email" value={props.email} name="Email" onChange={({ target }) => props.setEmail(target.value)} required/>
        </span>   
      </div>
      <br/>
      <div className="form_date">
        <span>Password:</span>
        <span>
          <input type="password" value={props.password} name="Password" onChange={({ target }) => props.setPassword(target.value)} required/>
        </span>
      </div>
      <div className="form_date">
        <span>Repeat password:</span>
        <span>
          <input type="password" value={props.password1} name="Password1" onChange={({ target }) => props.setPassword1(target.value)} required/>
        </span>
      </div>
      <br/>
      <div className="form_date">
        <span>Authorization Code:</span>
        <span>
          <input type="text" value={props.code} name="Code" onChange={({ target }) => props.setCode(target.value)} required/>
        </span>
      </div>
      <div className="form_button">
        <button type="submit">Register</button>
      </div>
    </form>
  )
}

export default CreateUserForm