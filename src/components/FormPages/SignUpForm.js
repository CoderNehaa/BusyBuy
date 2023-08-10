import React from 'react';
import formStyle from "./formStyle.module.css";
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  return (
    <div className={formStyle.pageStyle}>
      <h1> Sign Up </h1>
      <form>
        <input type="name" placeholder="Enter Name" required/>
        <input type="email" placeholder="Enter email" required/>
        <input type="passwrord" placeholder="Enter password" required/>
        <button> Sign Up </button>
        <Link to='/signin' className="linkStyle"> Or Signin instead </Link>
      </form>
    </div>
  )
}

export default SignUpForm;
