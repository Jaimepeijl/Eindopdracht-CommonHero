import React, {useState} from "react";
import axios from "axios";
import SmallHeader from "../components/SmallHeader";
import "./SignUp.css";
import Footer from "../components/Footer";
import backgroundImage from './../assets/ar-66uHNa7KFJ8-unsplash.jpg'
import {useHistory} from "react-router-dom";

function SignUp(){
    const [username, setUsername]  = useState('');
    const [password, setPassword] = useState('')
    const [email, setEmail]  = useState('');
    const [name, setName]  = useState('');
    const [city, setCity]  = useState('');

    const history = useHistory();

    const [addSucces, toggleAddSuccess] = useState(false);

    async function addUser(e){
        e.preventDefault();
        console.log(name, email, username, city);


        try{
            const response = await axios.post('http://localhost:8080/gebruikers/signup',{
                username: username,
                password: password,
                email: email,
                name: name,
                city: city,
            }
        );
            console.log(response.data)
            toggleAddSuccess(true);
        } catch (e) {
            console.error(e)
        }
    }

    return(
        <>
        <SmallHeader
            backgroundImage={backgroundImage} title="superhero girl with geese" height={'100vh'} >

            <div className="form-container">
                {addSucces === true &&
                    <div className="login-form">
                        <h1>Je account is aangemaakt!</h1>
                        <p>Klik hieronder om gelijk in te loggen</p>
                        <button
                            className="button"
                            type="button"
                            onClick={() => history.push('/signin')}>
                            Inloggen
                        </button>
                    </div>

                }
            {!addSucces === true &&
                <form className="login-form" onSubmit={addUser}>
                    <h3>Maak hieronder een nieuw account aan!</h3>
                <label htmlFor="user-name">
                    Naam en achternaam:
                    <input
                        type="text"
                        name="user-name-field"
                        id="user-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                </label>
                <label htmlFor="pass">
                    Wachtwoord (minimaal 8 karakters):
                    <input
                        type="password"
                        name="password-field"
                        id="pass"
                        value={password}
                        minLength="8"
                        required
                        onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label htmlFor="username">
                    Gebruikersnaam:
                    <input
                        type="text"
                        name="username-field"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label htmlFor="user-email">
                    Email:
                    <input
                        type="email"
                        name="user-email-field"
                        id="user-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label htmlFor="user-city">
                    Stad:
                    <input
                        type="city"
                        name="user-city-field"
                        id="user-city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}/>
                </label>
                <button
                    type="submit"
                    className="submit-button">
                    Voeg gebruiker toe
                </button>
            </form>}
        </div></SmallHeader>
            <Footer/>
            </>)
}
export default SignUp