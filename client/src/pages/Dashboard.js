import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

export default function Dashboard() {
    const authContext = useContext(AuthContext);
    const {auth} = authContext
    return (
        <div>
            <h2>Dashboard Page</h2>
            <button onClick={() => {handleClick()}}>Get Info</button>
            <div>TOKEN: {auth.token}</div>
            <div>EXPIIRY: {auth.expiresAt}</div>
            <div>iNFO: {auth.userInfo}</div>
        </div>
    )
}
