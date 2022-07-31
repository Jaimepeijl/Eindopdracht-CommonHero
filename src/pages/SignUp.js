import React, {useState} from "react";
import axios from "axios";
import SmallHeader from "../components/SmallHeader";
import "./SignUp.css";
import Footer from "../components/Footer";
import backgroundImage from './../assets/ar-66uHNa7KFJ8-unsplash.jpg'
import {useHistory} from "react-router-dom";
import { useForm } from 'react-hook-form';

function SignUp(){
    const [username, setUsername]  = useState('');
    const [password, setPassword] = useState('')
    const [email, setEmail]  = useState('');
    const [name, setName]  = useState('');
    const [city, setCity]  = useState('');

    const { register, handleSubmit, formState: { errors },} = useForm();

    const history = useHistory();

    const [addSucces, toggleAddSuccess] = useState(false);

    async function addUser(data){
        console.log(data)
        console.log(name, email, username, city);
        try{
            const response = await axios.post('http://localhost:8080/gebruikers/signup',{
                username: data.username,
                password: data.password,
                email: data.email,
                name: data.name,
                city: data.city,
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
                <form className="login-form" onSubmit={handleSubmit(addUser)}>
                    <h3>Maak hieronder een nieuw account aan!</h3>
                <label htmlFor="name">
                    Naam en achternaam:
                    <input
                        type="text"
                        id="name"
                        {...register("name", {
                            required: "Gaarne je naam invullen!",
                            maxLength: {
                                value: 20,
                                message: "Oei, dat is wel een hele lange naam! Kan die niet korter?"
                            },
                            minLength: {
                                value: 2,
                                message: "Je moet hier natuurlijk wel iets invullen!"
                            }
                        })}
                        />
                </label>
                    {errors.name && <p className="error-message">{errors.name.message}</p>}

                <label htmlFor="password">
                    Wachtwoord (minimaal 8 karakters):
                    <input
                        type="password"

                        id="pass"
                        {...register("password", {
                            required: "Je moet natuurlijk wel een wachtwoord hebben!",
                            maxLength: {
                                value: 20,
                                message: "Oei, dat is wel een heel lang wachtwoord! Kan die niet korter?"
                            },
                            minLength: {
                                value: 8,
                                message: "Ik weet zeker dat je wel iets moeilijkers kunt verzinnen!"
                            }
                        })}
                        />
                </label>
                    {errors.password && <p className="error-message">{errors.password.message}</p>}

                <label htmlFor="username">
                    Gebruikersnaam:
                    <input
                        type="text"
                        id="username"
                        {...register("username", {
                            required: "Gaarne je gebruikersnaam invullen!",
                            maxLength: {
                                value: 20,
                                message: "Oei, dat is wel een hele lange gebruikersnaam! Kan die niet korter?"
                            },
                            minLength: {
                                value: 2,
                                message: "Je moet hier natuurlijk wel iets invullen!"
                            }
                        })}
                    />
                </label>
                    {errors.username && <p className="error-message">{errors.username.message}</p>}

                <label htmlFor="user-email">
                    Email:
                    <input
                        type="email"
                        id="user-email"
                        {...register("email", {
                            required: "Gaarne je email invullen!",
                            maxLength: {
                                value: 30,
                                message: "Oei, dat is wel een heel lang email adres! Kan die niet korter?"
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Ongeldig email adres!"
                            }
                        })}
                    />
                </label>
                    {errors.email && <p className="error-message">{errors.email.message}</p>}

                <label htmlFor="user-city">
                    Stad:
                    <input
                        type="city"
                        id="user-city"
                        {...register("city", {
                            required: "Gaarne je woonplaats invullen!",
                            maxLength: {
                                value: 20,
                                message: "Oei, dat is wel een hele lange naam! Kan die niet korter?"
                            },
                        })}
                    />
                </label>
                    {errors.city && <p className="error-message">{errors.city.message}</p>}

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