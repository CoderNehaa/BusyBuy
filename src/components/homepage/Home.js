import React, { useEffect, useState } from "react";
import { UserCustomHook } from "../context/UserContext";

import homeStyle from './home.module.css';
import Filter from "../filter/Filter";
import db from '../../firebase';

const Home = () => {
  const [products, setProducts] = useState([]);
  
  const {userName} = UserCustomHook();
    
  return (
    <div className={homeStyle.homePage}>
      <h1> Welcome {userName} :-) </h1>
      <input type="search" placeholder="Search by name" className={homeStyle.searchBox} required/>
      <Filter />

    </div>
  )
}

export default Home;
