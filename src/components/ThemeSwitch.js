import React, { useEffect, useState } from 'react'
import {FaMoon} from 'react-icons/fa';
import {BsSunFill} from 'react-icons/bs';

const ThemeSwitch = () => {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }, []);

    useEffect(() => {
      theme === 'dark'? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
    }, [theme])

    const handleThemeSwitch = () => setTheme(theme === 'dark' ? 'light':'dark') 

  return (
    <div>
      <button onClick={handleThemeSwitch}> {theme === 'dark'? <FaMoon/> : <BsSunFill />} </button>      
    </div>
  )
}

export default ThemeSwitch;
