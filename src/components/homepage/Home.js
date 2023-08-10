import React, {useState} from "react";
import homeStyle from './home.module.css'

const Home = () => {
  const [ value, setValue ] = useState(1);
  // const [checkedClothing, setCheckedClothing] = React.useState(false);

  // const handleChangeClothing = () => {
  //   setCheckedClothing(!checkedClothing);
  // };

  return (
    <div className={homeStyle.homePage}>
      <input type="search" placeholder="Search by name" className={homeStyle.searchBox} required/>

      <div className={homeStyle.sideBar}>
        <h2> Filter</h2>

        <div className={homeStyle.slider}>
          <div> Price : {value} </div>
          <input type="range" min="1" max="99999" step="100" value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>

        {/* <label> <input type="checkbox" checked={checkedClothing} onChange={handleChangeClothing}/> Clothing </label> */}
        
        <h3> Category </h3>
        <div className={homeStyle.categories}>
          <label> <input type="checkbox"/> Men's Fashion </label>
          <label> <input type="checkbox"/> Women's Fashion </label>
          <label> <input type="checkbox"/> Footwear </label>
          <label> <input type="checkbox"/> Jewellery </label>
          {/* <label> <input type="checkbox"/> Groceries </label>
          <label> <input type="checkbox"/> Electronics </label>
          <label> <input type="checkbox"/> Books </label>
          <label> <input type="checkbox"/> Sports, Fitness </label> */}
        </div>

      </div>

    </div>
  )
}

export default Home;
