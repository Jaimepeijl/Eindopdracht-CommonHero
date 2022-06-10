import React from "react";
import NavBar from "./NavBar";

function Header (){
    return(
    <header>
        <NavBar/>
        <h1>Welkom bij Common Hero</h1>
        <button type="button">
            Aanmelden
        </button>
    </header>
    )
}
export default Header