import './NavBar.css';
import React, {useContext} from 'react';
import logo from '../../assets/R1.png';
import {useHistory, Link, NavLink} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";

function NavBar(){
    const {isAuth, logOutFunction} = useContext(AuthContext);
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
                    exact to='/hulp-aanbieden'
                    activeClassName="active-link">
                    Hulp Aanbieden
                </NavLink>
            </li>
            <li>
                <NavLink
                    exact to='/hulp-vragen'
                    activeClassName="active-link">
                    Hulp Vragen
                </NavLink>
            </li>
            {isAuth &&
                <li>
                    <NavLink
                        exact to='/profile'
                        activeClassName="active-link">
                        Profiel
                    </NavLink>
                </li>
            }
            {!isAuth &&
                    <button
                        className="logButton"
                        type="button"
                        onClick={() => history.push('/signin')}>
                        Inloggen
                    </button>
                }
            {isAuth &&
                <button
                    className="logButton"
                    type="button"
                    onClick={logOutFunction}
                >
                    Uitloggen
                </button>
            }</ul>
        </div>
    </nav>
    )
}
export default NavBar