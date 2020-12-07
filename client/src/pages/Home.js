import React from 'react';
import { Link } from 'react-router-dom';
import GradientLink from '../components/common/GradientLink';
import GradientBar from './../components/common/GradientBar';
//import logo from './../images/logo.png';
import { AuthContext } from './../context/AuthContext';

export default function Home() {
    const authContext = useContext(AuthContext);
    return (
        <div>
            <h2>Home Page</h2>
        </div>
    )
}
