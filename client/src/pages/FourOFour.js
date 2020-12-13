import React from 'react';
import Hyperlink from './../components/common/Hyperlink'

export default function FourOFour() {
    return (
        <div className="not-found">
            <h2>404 Not Found</h2>
            <p>Return to{' '}
                <Hyperlink to="/" text="Home" />
            </p>
        </div>
    )
}
