import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

export default function Dashboard() {
    const authContext = useContext(AuthContext);

    const handleClick = () => {
        
    }
    return (
        <div>
            <h2>Dashboard Page</h2>
            <button onClick={() => {handleClick()}}>Get Info</button>
            <div>TOKEN: {authContext.authState.token}</div>
            <div>EXPIIRY: {authContext.authState.expiresAt}</div>
            <div>iNFO: </div>
        </div>
    )
}
