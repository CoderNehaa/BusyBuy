import React from "react";
import { UserCustomHook } from "./context/UserContext";

function Filter () {
    const {categories, filterProducts, value} = UserCustomHook();
    
  return (
      <div className="w-48 px-2 py-1 bg-slate-200 text-left text-lg tracking-wide fixed right-1 top-36 dark:bg-slate-700">
        
        <div>
          <div className="text-xl font-semibold text-center"> Price : {value} </div>
          <input className="w-44 cursor-pointer" type="range" min="1" max="1000" step="1" value={value} onChange={(e) => filterProducts(null, e.target.value)}/>
        </div>
         
        <h3 className="text-xl font-semibold"> Category </h3>
        <div className="m-1 flex flex-col">
        {categories.map((category, index) => {
          return (
            <label key={index} className="font-normal"> <input className="cursor-pointer" type="checkbox" onClick={() => filterProducts(category, value)}/> {category} </label>
          )
        })}
        </div>

      </div>
  )
}

export default Filter;
