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
    const [vactype, setVactype] = useState('');
    const [description, setDescription] = useState('');

    function button (){
        if(vactype === 'search'){history.push('/hulp-vragen')}
        else {history.push('/hulp-aanbieden')}
    }

    async function createOfferVacancy(e){
        e.preventDefault();
        console.log(publisher, title, hours, description);

        try{
            const response = await axios.post('http://localhost:8080/vacancies/offer', {
                publisher: user.username,
                title:  title,
                hours: hours,
                description: description,
            });
            console.log(response.data)
            toggleAddSuccess(true);

        } catch (e) {
            console.error(e)
        }
    }
    async function createSearchVacancy(e){
        e.preventDefault();
        console.log(publisher, title, hours, vactype, description);

        try{
            const response = await axios.post('http://localhost:8080/vacancies/search', {
                publisher: user.username,
                title:  title,
                hours: hours,
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
                        onClick={button}
                            >
                        Naar de vacature pagina
                        </button>
                        </>}
                    {!addSucces === true &&

                        <section>
                            {vactype === '' &&
                            <div><h1>Wat voor vacature wil je aanmaken?</h1>
                            <button
                                type="button"
                                onClick={() =>setVactype('search')}>Ik wil graag hulp vragen</button>
                            <button
                                type="button"
                                onClick={() =>setVactype('offer')}>Ik bied hulp aan</button>
                            </div>}
                            {vactype === 'offer' &&
                        <form className="hulpForm" onSubmit={createOfferVacancy}>
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
                            <label htmlFor="Samenvatting:">
                                <p>Bericht:</p>
                                <textarea
                                    name="message"
                                    className="samenvatting"
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
                            {vactype === 'search' &&
                                <form className="hulpForm" onSubmit={createSearchVacancy}>
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

                                    <label htmlFor="Samenvatting:">
                                        <p>Bericht:</p>
                                        <textarea
                                            name="message"
                                            className="samenvatting"
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
                        </section>}
                </section>
                }
            </SmallHeader>
            <Footer/>
        </>
    )
}
export default HulpAanbieden;