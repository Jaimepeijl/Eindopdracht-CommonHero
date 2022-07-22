import "./VacMaken.css";
import React, {useEffect, useState} from 'react'
import './Vacatures.css'
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import HulpAanbiedenVac from "../components/HulpAanbiedenVac";
import SmallHeader from "../components/SmallHeader";
import backgroundImage from './../assets/joseph-chan-zC7vO76hEqM-unsplash.jpg'
import axios from "axios";
import Footer from "../components/Footer";

function HulpAanbieden() {
    const {isAuth, user} = useContext(AuthContext);
    const history = useHistory();
    const [addSucces, toggleAddSuccess] = useState(false);

    const [publisher, setPublisher] = useState('Jaime');
    const [title, setTitle] = useState('');
    const [hours, setHours] = useState(1);
    const [vactype, setVactype] = useState('search');
    const [description, setDescription] = useState('');

    async function createVacancy(e){
        e.preventDefault();
        console.log(publisher, title, hours, vactype, description);

        try{
            const response = await axios.post('http://localhost:8080/vacancies', {
                publisher: user.username,
                title:  title,
                hours: hours,
                vactype: vactype,
                description: description,
            });
            console.log(response.data)
            toggleAddSuccess(true);

        } catch (e) {
            console.error(e)
        }
    }
    return(
        <>
            <SmallHeader
                backgroundImage={backgroundImage} title="spiderman with kids" height={'100vh'}>
                {!isAuth &&
                <section className="welcome">
                    <h1>Welkom bij CommonHero</h1>
                    <h2>Ben je nieuw? Meld je dan hieronder aan!</h2>
                    <button
                        type="button"
                        onClick={() => history.push('/signup')}
                    >
                        Aanmelden
                    </button>
                </section>}
                {isAuth &&
                <section className="hulpFormHeader">
                    {addSucces === true &&
                        <>
                            <div className="login-form">
                            <h1>Je vacature is aangemaakt!</h1>

                        </div>
                        <button
                        type="button"
                        className="submit-button"
                        onClick={() => history.push('/signin')}>
                        Terug naar de vacature pagina
                        </button>
                        </>}
                    {!addSucces === true &&
                        <form className="hulpForm" onSubmit={createVacancy}>
                            <h1>Wilt u een vacature plaatsen?</h1>
                            <h2>Vul hieronder de velden in</h2>
                            <input
                                type="hidden"
                                id="publisher"
                                name="publisher"
                                value={publisher}/>
                            <label htmlFor="title">
                                <p>Titel:</p>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}/>
                            </label>
                            <label htmlFor="hours">
                                <p>Aantal uren (tussen 1 en 5):</p>
                                <input
                                    type="number"
                                    id="hours"
                                    name="hours"
                                    min="1"
                                    max="5"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}/>
                            </label>

                            <div className="vactype-container">
                                <p>Wat voor vacature wil je plaatsen?</p>
                                <ul>
                                <li>
                                    <label htmlFor="search">
                                        <input
                                            className="radio"
                                            type="radio"
                                            id="search"
                                            name={vactype}
                                            value="search"
                                            onChange={(e) => setVactype(e.target.value)}/>
                                        <p>Ik zoek hulp</p>
                                    </label>
                                </li>
                                <li>
                                    <label htmlFor="offer">
                                        <input
                                            className="radio"
                                            type="radio"
                                            id="offer"
                                            name={vactype}
                                            value="offer"
                                            onChange={(e) => setVactype(e.target.value)}/>
                                        <p>Ik bied hulp aan</p>
                                    </label>
                                </li>
                            </ul>
                            </div>
                            <label htmlFor="Samenvatting:">
                                <p>Bericht:</p>
                                <textarea
                                    name="message"
                                    rows="10" cols="30"
                                    placeholder="Wat zoek je precies?:"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}/>
                            </label>
                            <button
                                type="submit"
                                className="submit-button">
                                Plaats de vacature!
                            </button>
                        </form>}
                </section>
                }
            </SmallHeader>
            <Footer/>
        </>
    )
}
export default HulpAanbieden;