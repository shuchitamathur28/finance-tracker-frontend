import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AuthService from '../services/AuthService';
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const img =
    "https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg";
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: ""
  });

  const auth  = useContext(AuthContext);
  
  useEffect(() => { 
      if (auth.isAuthenticated) {
        navigate("/dashboard");
      }
  },[auth.isAuthenticated]);

  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        handleError("Please fill all the fields");
        return;
      }
      const resp = await AuthService.login({ ...inputValue});
      if(resp.success) {
        handleSuccess(resp.message);
        auth.setUserData(resp.userdata);
        navigate('/dashboard');
      }
    } catch (error) {
      handleError("An error occurred during login", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center w-full mt-12">
      <div className="max-w-screen-xl w-960 m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-200 p-6 sm:p-12">
          <div>
            <h1 className="text-xl xl:text-3xl font-semibold text-purple-800 text-center">
              Welcome to Expense Tracker
            </h1>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
            <div className="my-6 mx-auto max-w-xs">
              <form onSubmit={handleSubmit}>
                <input
                  className="w-full px-8 py-4 my-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                />
                <button className="text-md mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none cursor-pointer" type="submit">
                  <svg className="w-6 h-4 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">
                      Login
                  </span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Do not have an account?  &nbsp;
                    <span className="text-purple-800"> 
                     <Link to={"/signup"}>Signup</Link>
                    </span>
                </p>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 flex-1 w-500 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            alt="image"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
