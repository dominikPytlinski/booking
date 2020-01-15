import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const MainNavigation = () => {
    return (
        <Fragment>
            <header>
                <div className="brand" ></div>
                <div className="main-menu">
                    <ul>
                        <li>
                            <NavLink to="/">Events</NavLink>
                        </li>
                    </ul>
                </div>
            </header>
        </Fragment>
    )
}

export default MainNavigation
