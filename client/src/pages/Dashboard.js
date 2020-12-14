import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

export default function Dashboard() {
    const authContext = useContext(AuthContext);
    
    const handleClick = () => {
        authContext.logout();
    }
    return (
        <div>
            <h2>Hello {authContext.authState.userInfo.firstName}</h2>
            <button onClick={() => {handleClick()}}>Logout</button>
            <div>TOKEN: {authContext.authState.token}</div>
            <div>EXPIIRY: {authContext.authState.expiresAt}</div>
            <div>iNFO: </div>
        </div>
    )
}
