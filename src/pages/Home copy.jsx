import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const img =
    "https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg";
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['token']);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        // console.log("No token found");
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, removeCookie]);
  const Logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <h1 className="text-xl xl:text-3xl font-semibold text-purple-800 text-center">
              Welcome to Expense Tracker
            </h1>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">{" "}
              Welcome <span className="text-violet-600">{username}</span>
            </h1>
            <div className="mt-6 font-regular mx-auto max-w-xs text-sm">
              <button className="cursor-pointer" onClick={Logout}>LOGOUT</button>
              <ToastContainer />
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
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

export default Home;
