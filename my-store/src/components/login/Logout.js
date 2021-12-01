import React from "react";
import Login from "./Login";
import { Redirect } from "react-router-dom";

const Logout = () => {
    sessionStorage.setItem('isLogged', false);

    return <Redirect to="/" />
}

export default Logout;