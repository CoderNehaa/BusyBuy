import React, { useState } from 'react';
import {Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { UserCustomHook } from './context/UserContext';
import ThemeSwitch from './ThemeSwitch';
import Filter from "./Filter";
import Loader from './Loader';

const Navbar = () => {
    const {user, logOut, handleSearchChange, loading} = UserCustomHook();
    const [showFilter, setShowFilter] = useState(false);
    const location = useLocation();

    return (
        <>
        {loading 
        ?<Loader />
        :<>
            <div className="fixed shadow-lg shadow-white-10 w-full z-1 bg-slate-100 top-0 lg:flex lg:justify-between items-center dark:bg-slate-900 dark:text-slate-400 dark:shadow-md dark:shadow-slate-800">
                <div>
                    <div className="flex justify-evenly font-bold text-4xl py-2 text-center tablet:text-lg lg:p-7 lg:pl-2 lg:text-3xl xl:text-4xl"> 
                        <i className="fa-solid fa-baht-sign fixed left-0 ml-1 lg:invisible"></i>
                        <Link to='/' className="linkStyle"> Busybuy </Link>   
                        <span className="text-2xl fixed right-0 m-1 lg:text-base lg:p-1 xl:text-3xl xl:pr-3"> <ThemeSwitch /> </span>
                    </div>
                    
                </div>

                {location.pathname === '/' && <div className='text-md bg-white w-96 sm:w-11/12 lg:w-72 m-auto p-2 border-2 font-normal xl:w-96 border-gray-200 dark:bg-slate-800 dark:border-slate-800'> 
                    <i class="fa-solid fa-magnifying-glass mr-4"></i>
                    <input 
                        type="search"
                        onChange={handleSearchChange}
                        placeholder="Search by Name"
                        className='bg-transparent focus:outline-none w-80 lg:w-48 desktop:w-80' 
                        required/>
                </div>}
                
                <div className="lg:w-7/12">
                    <ul className="text-base flex justify-evenly list-none py-2 lg:font-semibold lg:mr-2 xl:text-xl xl:font-bold">

                        <li className="dark:hover:text-sky-700"> 
                        <i className="fa-solid fa-house mr-2 invisible lg:visible"></i>
                            <NavLink to='/' className={({isActive}) => isActive ? 'border-b-4 border-red-950 dark:border-slate-400':null}> 
                                 Home 
                            </NavLink> 
                        </li>
                        
                        { !user && <li className="dark:hover:text-sky-700"> 
                        <i className="fa-solid fa-right-to-bracket mr-2 invisible lg:visible"></i>
                            <NavLink to='/signin' className={({isActive}) => isActive ? 'lg:border-b-4 border-red-950 dark:border-slate-400':null}> 
                                 Sign In 
                            </NavLink> 
                        </li>}

                        {user && <li className="dark:hover:text-sky-700"> 
                        <i className="fa-solid fa-cart-shopping mr-2 invisible lg:visible"></i>
                            <NavLink to='/cart' className={({isActive}) => isActive ? 'lg:border-b-4 border-red-950 dark:border-slate-400':null}> 
                                Cart 
                            </NavLink> 
                        </li>}

                        {user &&<li className="dark:hover:text-sky-700"> 
                        <i className="fa-solid fa-clipboard-list mr-2 invisible lg:visible"></i>
                        <NavLink to='/orders' className={({isActive}) => isActive ? 'lg:border-b-4 border-red-950 dark:border-slate-400':null}>
                            My Orders </NavLink> 
                        </li>}

                        {user && <li className="dark:hover:text-sky-700">
                        <i className="fa-solid fa-arrow-right-from-bracket mr-2 invisible lg:visible"></i>
                            <Link to = '/' className="linkStyle" onClick={logOut}> Sign Out </Link>
                        </li>}

                        <i className="fa-solid fa-filter mr-2 invisible lg:visible"></i>
                        {location.pathname === '/' && <li className={`dark:hover:text-sky-700 ${showFilter && 'border-b-4 border-red-950 dark:border-slate-400'}`}> 
                            <button className= "tracking-wide" onClick={() => setShowFilter(!showFilter)}> Filter </button>
                        </li>}
                        {showFilter && <Filter/>}

                        
                    </ul>
                </div> 
                
            </div>
            <Outlet/>
            </>
        }
        </>
    )
}

export default Navbar;
