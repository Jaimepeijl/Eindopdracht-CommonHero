import React from 'react';
import {useHistory} from "react-router-dom";
import HulpAanbiedenVac from "../components/Vacs/HulpAanbiedenVac";
import HulpVragenVac from "../components/Vacs/HulpVragenVac"
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer"
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";
import party from "./../assets/superhero.png"
import robot from "./../assets/robot.png"
import carRepair from "./../assets/car-repair.png"
import wheelchair from "./../assets/wheelchair.png"
import plant from "./../assets/plant.png"
import friends from "./../assets/superheroFriends.png"
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";

function Home() {
    const {isAuth} = useContext(AuthContext);
    const history = useHistory();
    const [vacOfferInfo, setVacOfferInfo] = useState([])
    const [vacSearchInfo, setVacSearchInfo] = useState([])

    useEffect(()=> {
        async function getVacancies() {
            try {
                const response = await axios.get('http://localhost:8080/vacancies/offer')
                setVacOfferInfo(response.data)
            } catch (e) {
                console.error(e)
            }
        }
        getVacancies();
    }, []);
    useEffect(()=> {
        async function getVacancies() {
            try {
                const response = await axios.get('http://localhost:8080/vacancies/search')
                setVacSearchInfo(response.data)
            } catch (e) {
                console.error(e)
            }
        }
        getVacancies();
    }, []);

    return (
        <>
            <Header>
                {!isAuth &&
                    <section className="welcome">
                    <h1>Welkom bij CommonHero</h1>
                    <h2>Ben je nieuw? Meld je dan hieronder aan!</h2>
                    <button
                        type="button"
                        onClick={() => history.push('/signup')}>
                        Aanmelden
                    </button>
                </section>
                }
                {isAuth &&
                    <section className="welcome">
                        <h1>Wilt u een vacature plaatsen?</h1>
                        <h2>Klik dan op onderstaande knop</h2>
                        <button
                            type="button"
                            onClick={() => history.push('/vacmaken')}>
                            Gelijk een vacature maken
                        </button>
                    </section>
                }
                <div className="line1"></div>
            </Header>
            <div className="vacature-container">
            <div className="title">
                <h1>Bekijk hieronder alvast het aanbod</h1>
            </div>
            <div id="vacatures">
                <ul className="hulpAanbod">
                    <h2>Hulp Aangeboden</h2>
                    <section className="vacatures">
                        {vacOfferInfo && vacOfferInfo.map((info)=>{
                            return (
                                <HulpAanbiedenVac vacInfo={info} key={info.title}/>
                            )
                        })}
                    </section>
                </ul>
                <ul className="hulpGezocht">
                    <h2>Hulp Gezocht</h2>
                    <section className="vacatures">
                        {vacSearchInfo && vacSearchInfo.map((info)=>{
                            return (
                                <HulpVragenVac vacInfo={info} key={info.title}/>
                            )
                        })}
                    </section>
                </ul>
            </div>
                <div className="line1"></div>
            </div>

            <div className="webdev">
                <section>
                    <article>
                        <img src={party} alt="superhero-icon"/>
                        <h1>Samen Staan We Sterk!</h1>
                        <p>
                            Met alle problemen van vandaag zoekt CommonHero naar de oplossingen samen met iedereen die mee wilt doen. Iedereen is uniek en heeft weer een unieke skill en unieke interesses. Door die te gebruiken op de juiste plek, maken vele handen echt licht werk. Iedereen kan voor iemand een held zijn!
                        </p>
                    </article>
                    <article>
                        <img src={robot} alt="robot-icon"/>
                        <h1>Help Mensen Uit Andere Culturen</h1>
                        <p>
                            Er zijn nog nooit zo veel vluchtelingen in Nederland geweest.
                            Het kan voor sommige mensen erg lastig zijn om aan Nederland te wennen.
                            Wil jij deze mensen misschien een dagje meenemen of een Nederlands lesje geven? Kan jij misschien Arabisch of Oekraïens? Nog beter!
                        </p>
                    </article>
                    <article>
                        <img src={carRepair} alt="car-repair-icon"/>
                        <h1>Speciale Skill Of Handige Tools?</h1>
                        <p>Niet iedereen kan overal goed in zijn. Heb jij een skill waarmee je andere kunt helpen? Denk bijvoorbeeld aan timmeren, medische zorg, of misschien internet aansluiten.
                            Niet alles is voor iedereen zo makkelijk als voor jou en niet iedereen kan al het gereedschap hebben. Help jij een handje(?) mee?
                        </p>
                    </article>
                    <article>
                        <img src={wheelchair} alt="wheelchair-icon"/>
                        <h1>Help Mensen Die Het Nodig Hebben</h1>
                        <p>
                            Er zijn veel mensen die om verschillende redenen net iets meer moeite hebben met alledaagse dingen. Vaak kunnen deze mensen bijna alles maar met veel meer moeite.
                            Je kunt je voorstellen dat het dan erg fijn is om een keertje hulp te hebben. Denk bijvoorbeeld aan boodschappen doen, een ritje naar familie of een muurtje dat nodig geverft moet worden.
                        </p>
                    </article>
                    <article>
                        <img src={plant} alt="plant-icon"/>
                        <h1>Doe Wat Je Leuk Vind!</h1>
                        <p>Heb jij een passie en vind je het leuk om daarmee mensen te helpen? Of doe je een opleiding en wil je alvast wat ervaring opdoen in die richting? Laat het ons weten en bied je hulp aan. Dit kan alles zijn van tuinieren, computeren, timmeren, auto rijden tot koken.

                        </p>
                    </article>
                    <article>
                        <img src={friends} alt="friends-icon"/>
                        <h1>Maak Vrienden!</h1>
                        <p>Als je mensen helpt, ontmoet je vaak nieuwe vrienden. Is dat niet het mooiste wat er is? Er zijn enorm veel eenzame mensen in Nederland die een nieuwe vriend of vriendin kunnen gebruiken. Het kan soms moeilijk zijn om die te vinden.
                        Help jij mee?</p>
                    </article>
                </section>
            </div>
            <div className="line2"></div>

            <Footer/>
        </>
    );
}

export default Home;
