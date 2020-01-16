import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';

const MainNavigation = () => {
    return (
        <Fragment>
            <header className="main-navigation">
                <div className="brand" >
                    <span>Logo</span>
                </div>
                <div className="main-menu">
                    <ul>
                        <li>
                            <NavLink to="/events" activeStyle={{ color: "#FFFF99" }}>Events</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" activeStyle={{ color: "#FFFF99" }}>Login</NavLink>
                        </li>
                    </ul>
                </div>
            </header>
        </Fragment>
    )
}

export default MainNavigation
