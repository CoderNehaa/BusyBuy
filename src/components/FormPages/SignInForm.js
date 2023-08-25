import React, { useEffect, useState } from 'react';
import formStyle from "./formStyle.module.css";

import { Link, useNavigate } from 'react-router-dom';
import { UserCustomHook } from '../context/UserContext';

const SignInForm = () => {
  const [values, setValues] = useState({email:"", pass:""});
  const {logIn, user} = UserCustomHook();
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    logIn(values);
  }

  useEffect(() => {
    if(user){
      navigate('/');
    }
  }, [user])

  return (
    <div className='pt-32 h-screen dark:bg-slate-900 dark:text-gray-400'>
    <div className={formStyle.pageStyle}>
      <h1> Sign  In </h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter email" onChange={(e) => setValues((prev) => ({...prev, email:e.target.value}))} required/>
        <input type="passwrord" placeholder="Enter password" onChange={(e) => setValues((prev) => ({...prev, pass:e.target.value}))} required/>
        <button> Sign In </button>
      </form>

      <Link to='/signup' className="linkStyle">  Or SignUp instead </Link>
    </div>
    </div>
  )
}

export default SignInForm;
