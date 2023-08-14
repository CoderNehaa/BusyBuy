import React, { useState } from "react";


function Filter () {
    const [ value, setValue ] = useState(1000);
    // const [checkedClothing, setCheckedClothing] = React.useState(false);
  
    // const handleChangeClothing = () => {
    //   setCheckedClothing(!checkedClothing);
    // };
  
  
  return (
      <div className="left-0 w-72 px-2 py-5 bg-slate-200 text-center text-xl tracking-wide fixed top-72">
        <h2 className="text-3xl font-semibold"> Filter</h2>

        <div>
          <div className="mt-2"> Price : {value} </div>
          <input className="w-60 h-14" type="range" min="1" max="99999" step="100" value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>

        {/* <label> <input type="checkbox" checked={checkedClothing} onChange={handleChangeClothing}/> Clothing </label> */}
        
        <h3 className="text-2xl font-semibold text-center"> Category </h3>
        <div className="mt-4 ml-4 flex flex-col text-left">
          <label> <input className="h-4 w-4 mr-2" type="checkbox"/> Men's Fashion </label>
          <label> <input className="h-4 w-4 mr-2" type="checkbox"/> Women's Fashion </label>
          <label> <input className="h-4 w-4 mr-2" type="checkbox"/> Footwear </label>
          <label> <input className="h-4 w-4 mr-2" type="checkbox"/> Jewellery </label>
          <label> <input className="h-4 w-4 mr-2"  type="checkbox"/> Groceries </label>
          <label> <input className="h-4 w-4 mr-2"  type="checkbox"/> Electronics </label>
          <label> <input className="h-4 w-4 mr-2"  type="checkbox"/> Books </label>
          <label> <input className="h-4 w-4 mr-2"  type="checkbox"/> Sports, Fitness </label>
        </div>

      </div>
  )
}

export default Filter;
