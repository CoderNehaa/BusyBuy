import React, { useState } from 'react';
import formStyle from "./formStyle.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { UserCustomHook } from '../context/UserContext';

const SignInForm = () => {
  const [values, setValues] = useState({email:"", pass:""});
  const navigate = useNavigate();
  const {logIn} = UserCustomHook();

  async function handleSubmit(e){
    e.preventDefault();
    try{
      await logIn(values.email, values.pass);
      navigate('/');
    } catch(err) {
      console.log("err from component", err);
    }
  }

  return (
    <div className={formStyle.pageStyle}>
      <h1> Sign  In </h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter email" onChange={(e) => setValues((prev) => ({...prev, email:e.target.value}))} required/>
        <input type="passwrord" placeholder="Enter password" onChange={(e) => setValues((prev) => ({...prev, pass:e.target.value}))} required/>
        <button> Sign In </button>
      </form>

      <Link to='/signup' className="linkStyle">  Or SignUp instead </Link>
    </div>
  )
}

export default SignInForm;
