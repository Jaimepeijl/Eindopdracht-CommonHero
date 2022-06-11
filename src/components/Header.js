import React from "react";
import {Link} from "react-router-dom";
import logo from "../assets/R1.png";

function Header (){
    return(
        <header>
            <h1>Welkom bij CommonHero</h1>
            <h2>Ben je nieuw? Meld je dan hieronder aan!</h2>
            <button type="button">
                Aanmelden
            </button>
        </header>
    )
}
export default Header