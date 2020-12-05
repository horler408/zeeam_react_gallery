import React from 'react';
import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";

export default function NavBar() {
    return (
        <div className="nav">
            <img src={logo} alt="Site Logo" />
            
            <div className="menu">
                <div className="menu__item active"><Link to="/">Home</Link></div>
                <div className="menu__item"><Link to="/gallery">Gallery</Link></div>
                <div className="menu__item"><Link to="/dashboard">Dashboard</Link></div>
                <div className="menu__item" id="register-btn"><Link to="/register">Register</Link></div>
                <div className="menu__item" id="login-btn"><Link to="/login">Login</Link></div>
            </div>
            <div className="sidebar__toggle">
                <button className="head__sidebar-toggle">
                <i className="fas fa-bars"></i>
                </button>
            </div>
        </div>
    )
}
