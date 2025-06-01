import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Header =() => {
    const [open, setOpen] = useState(false);
    const auth = useContext(AuthContext);
    const userData = localStorage.getItem("expense_user")?JSON.parse(localStorage.getItem("expense_user")):null;

    useEffect(() => {
        if(open) {
            document.getElementById("myDropdown").classList.remove("invisible");
        } else {
            document.getElementById("myDropdown").classList.add("invisible");
        }
    },[open]);
    
return (<header>
    <nav className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
        <div className="flex flex-wrap items-center">
            <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
                <a href="#" aria-label="Home">
                    <span className="text-xl pl-2"><i className="em em-grinning"></i></span>
                </a>
            </div>

            <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 font-bold text-xl">
                My Personal Finance Tracker Dashboard
            </div>

            <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                    <li className="flex-1 md:flex-none md:mr-10">
                        <div className="relative inline-block">
                            <button onClick={() => { setOpen(!open); }} className="drop-button text-white py-2 px-2"> <span className="pr-2"><i className="em em-robot_face"></i></span> Hi, {" "} 
                            { userData ? userData.username : " User" }
                            <svg className="h-3 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg></button>
                            <div id="myDropdown" className="dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30  invisible">
                                {auth.isAuthenticated ? (
                                <>
                                    <a href="/dashboard" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block cursor-pointer">Dashboard</a>
                                    <a href="/transactions" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block cursor-pointer">My Transactions</a>
                                    <a onClick={auth.logout} className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block cursor-pointer">Log Out</a>
                                </>
                                ) : (
                                    <>
                                        <a href="/login" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block cursor-pointer">Log In</a>
                                        <a href="/signup" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block cursor-pointer">Signup</a>
                                    </>
                                )}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </nav>
</header>);
}

export default Header;