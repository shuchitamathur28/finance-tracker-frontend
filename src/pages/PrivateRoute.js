import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

// A function that checks if a user is authenticated

const isAuthenticated = () => {
    // const cookies = useCookies(['token']);

    // if (cookies[0].token && cookies[0].token !== "undefined") {
    //     return true;
    // }
    // return false;

    return localStorage.getItem('token'); // Or your own authentication check logic
};

const PrivateRoute = ({ element }) => {
    if (isAuthenticated()) {
        // console.log('Authenticated')
        return element; // If authenticated, return the protected component
    } else {
        Navigate("/login");
        // console.log('Not Authenticated')
        //return <Navigate to="/login" />; // Redirect to login if not authenticated
    }
};

export default PrivateRoute;
