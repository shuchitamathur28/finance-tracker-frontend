import { createContext, useState, useEffect } from "react";
// import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userdata, setUserdata] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    useEffect(() => {
      setTimeout(() => {
        if (token!== null && token !== "undefined") {
          setIsAuthenticated(true);
          // handleError("Already logged in");
          setUserdata(localStorage.getItem("expense_user"));
        }
        else {
          // handleError("Please login to continue");
          // navigate("/login");
        }
      },50);      
    }, []);

    
    const handleError = (err) =>
      toast.error(err, {
        position: "bottom-left",
      });
    const handleSuccess = (msg) =>
      toast.success(msg, {
        position: "bottom-right",
      });

    const login = async (input) => {
        setUserdata(input.userdata);
        if (input.success) {
          handleSuccess(message);
        } else {
          localStorage.removeItem('token');
          handleError(message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("expense_user");
        setIsAuthenticated(false);
        navigate("/login");
    };

    const setUserData = (data) => {
        const { email, username } = data;
        setUserdata({ email, username });
        localStorage.setItem("expense_user", JSON.stringify({email, username}));
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userdata, login, logout, setUserData}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;