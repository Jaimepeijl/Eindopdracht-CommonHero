import './NavBar.css'
import React, {useContext} from 'react'
import logo from './../assets/R1.png'
import {useHistory, Link, NavLink} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar(){
    const {isLoggedIn, logOutFunction} = useContext(AuthContext);
    const history = useHistory();
    return (
        <nav>
            <span className="logo">
                <Link to="/">
        <img src={logo} alt="CommonHero-Logo"/>
            </Link>
            </span>
        <div className="NavBar">
            <ul>
            <li>
                <NavLink
                    exact to='/hulp-zoeken'
                    activeClassName="active-link">
                    Hulp Zoeken
                </NavLink>
            </li>
            <li>
                <NavLink
                    exact to='/hulp-vragen'
                    activeClassName="active-link">
                    Hulp Vragen
                </NavLink>
            </li>
            {isLoggedIn &&
                <li>
                    <NavLink
                        exact to='/profile'
                        activeClassName="active-link">
                        Profiel
                    </NavLink>
                </li>}

        </ul>
            {!isLoggedIn &&
                    <button
                        className="logButton"
                        type="button"
                        onClick={() => history.push('/signin')}>
                        Inloggen
                    </button>
                }
            {isLoggedIn &&
                <button
                    className="logButton"
                    type="button"
                    onClick={logOutFunction}
                    Link to='/'
                >
                    Uitloggen
                </button>}
        </div>
    </nav>)
}
export default NavBar