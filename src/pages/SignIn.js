import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import Header from "../components/Header";

function SignIn(){
    const {logInFunction, isLoggedIn} = useContext(AuthContext);
    console.log(isLoggedIn)
    return(
        <>
            <Header>
                <h1>Heb je al een account?</h1>
                <h1>Log hieronder in!</h1>
            </Header>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

            <form className="login-form">
                <p>*invoervelden*</p>
                <button
                    type="button"
                    onClick={logInFunction}
                >Inloggen
                </button>
            </form>

            {isLoggedIn && <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>}
        </>
    )
}
export default SignIn