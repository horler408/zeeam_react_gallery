import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GradientLink from '../components/common/GradientLink';
import GradientBar from './../components/GradientBar';
//import logo from './../images/logo.png';
import { AuthContext } from './../context/AuthContext';

export default function Home() {
    const authContext = useContext(AuthContext);

    console.log(authContext.authState);
    
    return (
        <div className="index_container">
            <div className="main">
                <h2 data-text="ZeeamFashionWorld">ZeeamFashionWorld</h2>
            </div>
        </div>
    )
}
