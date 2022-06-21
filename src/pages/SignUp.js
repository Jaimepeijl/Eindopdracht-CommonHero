import Header from "../components/Header";
import React, {useState} from "react";
import axios from "axios";

function SignUp(){
    const [username, setUsername]  = useState('');
    const [password, setPassword] = useState('')
    const [email, setEmail]  = useState('');
    const [name, setName]  = useState('');
    const [city, setCity]  = useState('');

    const [addSucces, toggleAddSuccess] = useState(false);

    async function addUser(e){
        e.preventDefault();
        console.log(name, email, username, city);

        try{
            const response = await axios.post('http://localhost:8080/users',{
                username: username,
                password: password,

                enabled: true,
                apiKey: 5,

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
        <Header>
            <h1>Maak hieronder een nieuw account aan!</h1>
        </Header>{addSucces === true && <h2>Gebruiker is toegevoegd!</h2>}
            {!addSucces === true &&
                <form onSubmit={addUser}>
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
                <button type="submit">
                    Voeg gebruiker toe
                </button>
            </form>}
        </>)
}
export default SignUp