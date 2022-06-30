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
    const {isLoggedIn, user, logOutFunction} = useContext(AuthContext);
    const history = useHistory();
    const [addSucces, toggleAddSuccess] = useState(false);

    const [publisher, setPublisher] = useState('Jaime');
    const [title, setTitle] = useState('');
    const [hours, setHours] = useState(1);
    const [searchOrOffer, isSearchOrOffer] = useState('search');
    const [description, setDescription] = useState('');

    async function createVacancy(e){
        e.preventDefault();
        console.log(publisher, title, hours, searchOrOffer, description);

        try{
            const response = await axios.post('http://localhost:8080/vacancies', {
                // publisher: user,
                publisher: publisher,
                title:  title,
                hours: hours,
                searchOrOffer: searchOrOffer,
                description: description,
            });
            console.log(response.data)
            toggleAddSuccess(true);

        } catch (e) {
            console.error(e)
        }
    }
    useEffect(()=>{
        async function getVacancies(){
            try{
                const response = await axios.get('http://localhost:8080/vacancies')
                console.log(response.data)
            } catch (e) {
                console.error(e)
            }
        }
        getVacancies();
    }, []);

    return(
        <>
            <SmallHeader
                backgroundImage={backgroundImage} title="spiderman with kids" height={'100vh'}>
                {/*{!isLoggedIn &&*/}
                {/*<section className="welcome">*/}
                {/*    <h1>Welkom bij CommonHero</h1>*/}
                {/*    <h2>Ben je nieuw? Meld je dan hieronder aan!</h2>*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        onClick={() => history.push('/signup')}*/}
                {/*    >*/}
                {/*        Aanmelden*/}
                {/*    </button>*/}
                {/*</section>*/}
                {/*{isLoggedIn &&*/}
                <section className="hulpFormHeader">
                    {addSucces === true &&
                        <div className="login-form">
                            <h1>Je vacature is aangemaakt!</h1>
                        </div>}
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

                            <div className="searchOrOffer-container">
                                <section>

                                    <label htmlFor="search">

                                        <input
                                            type="radio"
                                            id="search"
                                            name="searchOrOffer"
                                            value="search"
                                            onChange={(e) => isSearchOrOffer(e.target.value)}/>
                                        <p>Ik zoek hulp</p>
                                    </label>
                                </section>
                                <section>
                                    <label htmlFor="offer">

                                        <input
                                            type="radio"
                                            id="offer"
                                            name="searchOrOffer"
                                            value="offer"
                                            onChange={(e) => isSearchOrOffer(e.target.value)}/>
                                        <p>Ik bied hulp aan</p>
                                    </label>
                                </section>
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
                {/*}*/}
            </SmallHeader>
            <Footer/>
        </>
    )
}
export default HulpAanbieden;