import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {AuthContext} from "../context/AuthContext";
import {useState} from "react";
import "./SignIn.css";
import Footer from "../components/Footer";
import SmallHeader from "../components/SmallHeader";
import backgroundImage from './../assets/tim-mossholder-9ulzDarOwEI-unsplash.jpg'
import axios from "axios";

function SignIn(){
    const [username, setUsername]  = useState('');
    const [password, setPassword] = useState('')
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {logInFunction, isAuth} = useContext(AuthContext);
    const history = useHistory();

    async function onLoginFormSubmit(data){
        console.log(data.username)
        console.log(data.password)

        console.log(data.username)
        try{
            const response = await axios.post('http://localhost:8080/authenticate', {
                username: data.username,
                password: data.password,
            })
            console.log(response.data.accessToken);
            logInFunction(response.data.accessToken)
        } catch (e) {
            console.error(e)
        }
    }
    return(
        <>
            <SmallHeader
                backgroundImage={backgroundImage} title="pavement texture" height={'100vh'} >
                <div className="form-container">

            <form className="login-form" onSubmit={handleSubmit(onLoginFormSubmit)}>
                <h1>Inloggen</h1>
                <label htmlFor="username">
                    <p>Gebruikersnaam:</p>
                    <input
                        type="text"
                        id="username"
                        {...register("username")}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label htmlFor="pass">
                    <p>Wachtwoord (minimaal 8 karakters):</p>
                    <input
                        type="password"
                        {...register("password")}
                        id="password"
                        value={password}
                        minLength="8"
                        required
                        onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button
                    type="submit"
                    className="submit-button"
                >Inloggen
                </button>
                {!isAuth && <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>}
            </form>
                </div>
            </SmallHeader>
            <Footer/>
        </>
    )
}
export default SignIn