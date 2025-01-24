import { useState, useEffect } from 'react';

const RegisterForm = (props) => {
  return (
    <form onSubmit={props.handleRegister} className="registerForm">
      <h4>Create User</h4>
      <div className="form_button">
        <button type="submit">Register</button>
      </div>
    </form>
  )
}

export default RegisterForm