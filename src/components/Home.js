import React, { useState } from "react";
import { UserCustomHook } from "./context/UserContext";

import Filter from "./Filter";
import ProductCard from "./ProductCard";

const Home = () => {
  const {user, data} = UserCustomHook();

  return (
    <div className="my-6 navbar">
      <div className="flex flex-col flex-wrap content-center justify-center">
        <h1 className="text-4xl text-center font-bold"> Welcome {user && user.name}</h1>
        <input type="search" placeholder="Search by name" 
        className="text-2xl w-1/3 mt-10 p-4 border-4 border-black rounded-3xl" required/>
      </div>
      
      <Filter />

      <div className="ml-80 mt-12 flex justify-evenly flex-wrap">
        {data.map((product, index) => { return <ProductCard product = {product} key={index}/> })}
      </div>

    </div>
  )
}

export default Home;
