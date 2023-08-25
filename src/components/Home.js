import React, { useEffect, useState } from "react";
import { UserCustomHook } from "./context/UserContext";

import ProductCard from "./ProductCard";

const Home = () => {
  const {user, data, fetchProducts, getCartProducts, getOrders} = UserCustomHook();
  
  useEffect(() => {
    fetchProducts();
    if(user){
      getCartProducts();
      getOrders();
    }
  }, []);
   
  return (
    <div className='pt-12 dark:bg-slate-900 dark:text-slate-400 h-full'>
      <div className="flex flex-col flex-wrap content-center justify-center">
        <h1 className="text-4xl text-center font-bold dark:text-sky-400 pt-20"> Welcome {user && user.name}</h1>
      </div>

      
      <div className="mt-4 flex justify-evenly flex-wrap">
        {data.map((product, index) => { return <ProductCard product = {product} key={index}/> })}
      </div>

    </div>
  )
}

export default Home;
