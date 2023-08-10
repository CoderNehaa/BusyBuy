import React from 'react';
import formStyle from "./formStyle.module.css";
import { Link } from 'react-router-dom';

const SignInForm = () => {
  return (
    <div className={formStyle.pageStyle}>
      <h1> Sign  In </h1>
      <form>
        <input type="email" placeholder="Enter email" required/>
        <input type="passwrord" placeholder="Enter password" required/>
        <button> Sign In </button>
        <Link to='/signup' className="linkStyle">  Or SignUp instead </Link>
      </form>
    </div>
  )
}

export default SignInForm;
