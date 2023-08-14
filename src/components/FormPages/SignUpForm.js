import React, { useEffect, useState } from 'react';
import formStyle from "./formStyle.module.css";

import { Link, useNavigate } from 'react-router-dom';
import { UserCustomHook } from '../context/UserContext';

function SignUpForm () {
  const [values, setValues] = useState({name:"", email:"", pass:"", confirmPass:""});
  const {signUp, user, errorNotification} = UserCustomHook();
  const navigate = useNavigate();

  const handleSubmission = (e) => {
    e.preventDefault();
    if(values.pass !== values.confirmPass){
      errorNotification("Password and confirm password does not match.");
      return;
    }
    signUp(values);
  }

  useEffect(() => {
    if(user){
      navigate('/');
    }
  }, [user])
  
  return (
    <div className={formStyle.pageStyle}>
      <h1> Sign Up </h1>

      <form onSubmit={handleSubmission}>
        <input type="name" placeholder="Enter Name" onChange={(e) => setValues((prev) => ({...prev, name:e.target.value}))} required/>
        <input type="email" placeholder="Enter email" onChange={(e) => setValues((prev) => ({...prev, email:e.target.value}))} required/>
        <input type="passwrord" placeholder="Enter password" onChange={(e) => setValues((prev) => ({...prev, pass:e.target.value}))} required/>
        <input type="passwrord" placeholder="Confirm password" onChange={(e) => setValues((prev) => ({...prev, confirmPass:e.target.value}))} required/>
        
        <button> Sign Up </button>
      </form>

      <Link to='/signin' className="linkStyle"> Or Signin instead </Link>
    </div>
  )
}

export default SignUpForm;
