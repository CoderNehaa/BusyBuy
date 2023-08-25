import React, {useEffect, useState} from 'react';
import {Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { UserCustomHook } from './context/UserContext';
import ThemeSwitch from './ThemeSwitch';
import Filter from "./Filter";

const Navbar = () => {
    const [searchText, setSearchText] = useState('');
    const {user, logOut, data} = UserCustomHook();
    const [showFilter, setShowFilter] = useState(false);
    const location = useLocation();

    const handleSearchChange = (e) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);
    };

    useEffect(() => {
        // Filter the products based on the search query
        const filteredProducts = data.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()))
        filteredProducts.length === 0?console.log('0 search results'):console.log(filteredProducts);
    },[searchText])
    
    return (
        <>
        <div className="flex justify-between font-bold py-7 items-center shadow-lg shadow-white-10 w-full fixed z-1 bg-slate-100 dark:bg-slate-900 dark:text-slate-400 top-0 dark:shadow-md dark:shadow-slate-800">
            <div>
                <h1 className="pl-10 text-4xl "> 
                    <Link to='/' className="linkStyle"> Busybuy </Link>   
                </h1>
            </div>

            {location.pathname === '/' && <div>
                <input 
                    type="search"
                    onChange={handleSearchChange}
                    placeholder="Search by Name" 
                    className="text-md bg-white w-96 p-2 border-2 font-normal tracking-wider border-gray-200 bg-transparent dark:bg-slate-800 dark:border-slate-800 dark:rounded-2xl" required/>
            </div>}
            
            <div className="w-7/12">
                <ul className="flex justify-evenly list-none text-xl">
                    <li className="flex justify-center dark:hover:text-sky-700"> 
                        <NavLink to='/' className={({isActive}) => isActive ? 'border-b-4 border-red-950 dark:border-slate-400':null}> 
                            <i className="fa-solid fa-house text-xl mr-2"></i> Home 
                        </NavLink> 
                    </li>
                    
                    { !user && <li className="flex justify-center dark:hover:text-sky-700"> 
                        <NavLink to='/signin' className={({isActive}) => isActive ? 'border-b-4 border-red-950 dark:border-slate-400':null}> 
                            <i className="fa-solid fa-right-to-bracket text-xl mr-2"></i> Sign In 
                        </NavLink> 
                    </li>}

                    {user && <li className="flex justify-center dark:hover:text-sky-700"> 
                        <NavLink to='/cart' className={({isActive}) => isActive ? 'border-b-4 border-red-950 dark:border-slate-400':null}> 
                            <i className="fa-solid fa-cart-shopping text-xl mr-2"></i> Cart 
                        </NavLink> 
                    </li>}

                    {user &&<li className="flex justify-center dark:hover:text-sky-700"> 
                    <NavLink to='/orders' className={({isActive}) => isActive ? 'border-b-4 border-red-950 dark:border-slate-400':null}>
                         <i className="fa-solid fa-clipboard-list text-xl mr-2"></i> My Orders </NavLink> 
                    </li>}

                    {user && <li className="flex justify-center dark:hover:text-sky-700">
                        <i className="fa-solid fa-arrow-right-from-bracket text-xl mr-2"></i>
                        <Link to = '/' className="linkStyle" onClick={logOut}> Sign Out </Link>
                    </li>}

                    {location.pathname === '/' && <li className={`dark:hover:text-sky-700 ${showFilter && 'border-b-4 border-red-950 dark:border-slate-400'}`}>
                        <i className="fa-solid fa-filter text-xl mr-2"></i> 
                        <button className= "tracking-wide" onClick={() => setShowFilter(!showFilter)}> Filter </button>
                    </li>}
                    {showFilter && <Filter/>}


                    <li className="flex justify-center text-3xl"> <ThemeSwitch /> </li>
                    
                </ul>
            </div> 
             
        </div>
        <Outlet />
        </>
  )
}


export default Navbar;