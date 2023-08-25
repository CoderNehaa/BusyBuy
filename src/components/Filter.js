import React, { useEffect, useState } from "react";
import { UserCustomHook } from "./context/UserContext";

function Filter () {
    const {categories, data} = UserCustomHook();    
    
    const [ value, setValue ] = useState(1);
    const[selectedCategories, setSelectedCategories] = useState([]);

    const filterProducts = (category, val) => {
      setValue(val);
      if(category !== null){
        setSelectedCategories(prevSelectedCategories => {
          if (prevSelectedCategories.includes(category)) {
              return prevSelectedCategories.filter(element => element !== category);
          } else {
              return [...prevSelectedCategories, category];
          }
        });
      }
    }

    useEffect(() => {
      console.log("value is ", value, " and selected categgories are ", selectedCategories);
      if(selectedCategories.length === 0){
        const filteredProducts = data.filter(product => product.price < value);  
        console.log(filteredProducts);  
      } else {
        const filteredProducts = data.filter(product => product.price < value && selectedCategories.includes (product.category));
        console.log(filteredProducts);  
      }
    }, [selectedCategories, value])

  return (
      <div className="w-64 px-2 py-3 bg-slate-200 text-left text-lg tracking-wide fixed right-28 top-20 dark:bg-slate-700">
        
        <div>
          <div className="text-xl font-semibold text-center"> Price : {value} </div>
          <input className="w-52 h-8 cursor-pointer" type="range" min="1" max="1000" step="20" value={value} onChange={(e) => filterProducts(null, e.target.value)}/>
        </div>
         
        <h3 className="text-2xl font-semibold ml-4"> Category </h3>
        <div className="mt-2 ml-4 flex flex-col">
        {categories.map((category, index) => {
          return (
            <label key={index} className="font-normal"> <input className="h-4 w-4 mr-2 cursor-pointer" type="checkbox" onClick={() => filterProducts(category, value)}/> {category} </label>
          )
        })}
        </div>

      </div>
  )
}

export default Filter;
