import React, { useState } from 'react';
import formStyle from "./formStyle.module.css";

import { Link, useNavigate } from 'react-router-dom';
import { UserCustomHook } from '../context/UserContext';

function SignUpForm () {
  const [values, setValues] = useState({name:"", email:"", pass:""});
  const navigate = useNavigate();
  const {signUp} = UserCustomHook();

  const handleSubmission = async (e) => {
    e.preventDefault();
    
    try{
      await signUp(values.name, values.email, values.pass);
      navigate('/');
    } catch(err) {
      console.log("err from component", err);
    }
  }
  
  return (
    <div className={formStyle.pageStyle}>
      <h1> Sign Up </h1>

      <form onSubmit={handleSubmission}>
        <input type="name" placeholder="Enter Name" onChange={(e) => setValues((prev) => ({...prev, name:e.target.value}))} required/>
        <input type="email" placeholder="Enter email" onChange={(e) => setValues((prev) => ({...prev, email:e.target.value}))} required/>
        <input type="passwrord" placeholder="Enter password" onChange={(e) => setValues((prev) => ({...prev, pass:e.target.value}))} required/>
        <button> Sign Up </button>
      </form>

      <Link to='/signin' className="linkStyle"> Or Signin instead </Link>
    </div>
  )
}

export default SignUpForm;
