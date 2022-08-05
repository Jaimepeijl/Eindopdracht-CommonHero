import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import {useState} from "react";
import "./SignIn.css";
import Footer from "../../components/Footer/Footer";
import SmallHeader from "../../components/SmallHeader/SmallHeader";
import backgroundImage from '../../assets/tim-mossholder-9ulzDarOwEI-unsplash.jpg'
import axios from "axios";

function SignIn(){
    const [username, setUsername]  = useState('');
    const [password, setPassword] = useState('')

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {logInFunction, isAuth} = useContext(AuthContext);
    const [error, setError] = useState('')

    const history = useHistory();

    const isValid = username !== '' && password !== '';

    async function onLoginFormSubmit(data){
        try{
            const response = await axios.post('http://localhost:8080/authenticate', {
                username: data.username,
                password: data.password,
            })
            logInFunction(response.data.jwt)
            history.push('/')
        } catch (e) {
            console.error(e)
            setError(e.response.data)
        }
    }
    return(
        <>
            <SmallHeader
                backgroundImage={backgroundImage} title="pavement texture" height={'100vh'} >
                <div className="form-container">
            <form
                className="login-form"
                onSubmit={handleSubmit(onLoginFormSubmit)}>
                <h1>Inloggen</h1>
                <label htmlFor="username">
                    <p>Gebruikersnaam:</p>
                    <input
                        type="text"
                        id="username"
                        {...register("username")}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                {error && <p className="error-message">{error}</p>}
                <button
                    type="submit"
                    className="submit-button"
                    disabled={!isValid}
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