import React, { useEffect, useState } from 'react';
import formStyle from "./formStyle.module.css";

import { Link, useNavigate } from 'react-router-dom';
import { UserCustomHook } from '../../context/UserContext';

const SignInForm = () => {
  const [values, setValues] = useState({email:"", pass:""});
  const {logIn, signInWithGoogle, user} = UserCustomHook();
  const navigate = useNavigate();

  // Function to handle form submission
  async function handleSubmit(e){
    e.preventDefault();
    logIn(values);
  }

  // useEffect hook to set the document title and redirect if the user is logged in
  useEffect(() => {
    document.title = "BusyBuy | Sign in to your account"
    if(user){
      navigate('/');
    }
  }, [user])

  return (
    <div className=' pt-12 dark:bg-slate-900 dark:text-gray-400'>
    <div className={formStyle.pageStyle}>
      <h1> Sign  In </h1>
      <form>
        <input type="email" placeholder="Enter email" onChange={(e) => setValues((prev) => ({...prev, email:e.target.value}))} required/>
        <input type="passwrord" placeholder="Enter password" onChange={(e) => setValues((prev) => ({...prev, pass:e.target.value}))} required/>
        <button type='submit' onClick={handleSubmit}> Sign In </button>
        <button type='button' onClick={signInWithGoogle}> 
          <span> Sign In with Google </span> <i className = "fa-brands fa-google px-2 py-1 border-2 border-solid rounded-3xl text-base"></i> 
        </button>
      </form>

      <Link to='/signup' className="linkStyle">  Or SignUp instead </Link>
    </div>
    </div>
  )
}

export default SignInForm;
