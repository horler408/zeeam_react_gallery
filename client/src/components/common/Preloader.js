import React from 'react';
import preloader from './../../assets/preloader.gif';

export default function Preloader() {
    return (
        <div className="preloader">
            <img src={preloader} alt="Preloader" />
        </div>
    )
}
