import {Link} from "react-router-dom";
import React from "react";
import "./Footer.css";
import logo from '../../assets/R1.png';

function Footer (){
    return(
        <>
            <section className="Footer">
                <div>
                Als je ingelogd bent, bekijk dan de <Link to="/profile">Profielpagina </Link><br/>
            Je kunt hier <Link to="/signin">inloggen</Link> of hier jezelf <Link to="/signup">registeren</Link> als je nog geen
                account hebt.
                </div>
                <span className="logo">
                <Link to="/">
        <img src={logo} alt="CommonHero-Logo"/>
            </Link>
            </span>
            </section>
        </>
    )
}
export default Footer