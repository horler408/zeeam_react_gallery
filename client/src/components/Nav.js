import React from 'react';
import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";

export default function NavBar() {
    return (
        <div className="nav">
            <img src={logo} alt="Site Logo" />
        </div>
    )
}
