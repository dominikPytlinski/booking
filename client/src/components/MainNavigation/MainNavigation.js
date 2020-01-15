import React from 'react';

import './MainNavigation.css';

const MainNavigation = () => {
    return ( 
        <header className="header">
            <div className="brand">
                <span>Logo</span>
            </div>
            <div className="main-menu">
                <ul>
                    <li>
                        Events
                    </li>
                    <li>
                        Bookings
                    </li>
                    <li>
                        Login
                    </li>
                    <li>
                        Logout
                    </li>
                </ul>
            </div>
        </header>
     );
}
 
export default MainNavigation;