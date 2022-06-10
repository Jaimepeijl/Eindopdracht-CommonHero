import './NavBar.css'
import React, {useContext} from 'react'
import logo from './../assets/R1.png'
import {useHistory, Link, NavLink} from 'react-router-dom';
// import {AuthContext} from "../context/AuthContext";

function NavBar(){
    // const {logInFunction, isLoggedIn, logOutFunction} = useContext(AuthContext);
    // const history = useHistory();
    return (
        <nav>
            <span className="logo">
                <Link to="/">
        <img src={logo} alt="CommonHero-Logo"/>
            </Link>
            </span>
        <ul className="NavBar">
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
            <li>
                <NavLink
                    exact to='/signin'
                    activeClassName="active-link">
                    Inloggen
            </NavLink>
            </li>
        </ul>
    </nav>)
}
export default NavBar