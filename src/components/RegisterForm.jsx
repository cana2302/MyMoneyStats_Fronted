import { useState, useEffect } from 'react';

const RegisterForm = (props) => {
  return (
    <form onSubmit={props.handleRegister} className="registerForm">
      <h4>Create User</h4>
      <div className="form_login_button_register">
        <button type="submit">Register</button>
      </div>
    </form>
  )
}

export default RegisterForm