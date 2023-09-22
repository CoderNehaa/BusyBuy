import React, { useEffect } from "react";
import { UserCustomHook } from "../context/UserContext";

import ProductCard from "./ProductCard";
const Home = () => {
  const {user, products, fetchProducts, getCartProducts, getOrders} = UserCustomHook();
  
  // useEffect hook to fetch products, fetch cart products and orders also if the user is logged in
  useEffect(() => {
    fetchProducts();
    document.title = "BusyBuy | Busy in buying"
    if(user){
      getCartProducts();
      getOrders();
    }
  }, []);
   
  return (
    <div className='h-full min-h-screen pt-20 lg:pt-10 dark:bg-slate-900 dark:text-slate-400'>
      <div className="flex flex-col flex-wrap content-center justify-center">
        <h1 className="text-3xl text-center font-bold pt-20 font-mono"> Welcome {user && user.name}</h1>
      </div>
      
      <div className="mt-4 flex justify-evenly flex-wrap">
        {products.map((product, index) => { return <ProductCard product = {product} key={index}/> })}
      </div>

    </div>
  )
}

export default Home;
