import React from 'react'
import './Vacatures.css'
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import HulpVragenVac from "../components/HulpVragenVac";
import SmallHeader from "../components/SmallHeader";
import backgroundImage from './../assets/old-and-young-maptionnaire.jpeg'

function HulpVragen() {
    const {isLoggedIn, logOutFunction} = useContext(AuthContext);
    const history = useHistory();

    return(
        <>
            <SmallHeader
                backgroundImage={backgroundImage} title="people playing chess">
                {!isLoggedIn && <section className="welcome">
                    <h1>Welkom bij CommonHero</h1>
                    <h2>Ben je nieuw? Meld je dan hieronder aan!</h2>
                    <button
                        type="button"
                        onClick={() => history.push('/signup')}
                    >
                        Aanmelden
                    </button>
                </section>
                }
                {isLoggedIn && <section className="hulpFormHeader">
                    <h1>Heeft u ergens hulp bij nodig?</h1>
                    <h2>Vul hieronder de velden in</h2>
                    <form type="submit" className="hulpForm">
                        <label htmlFor="username">Gebruikersnaam:</label>
                        <input type="text" id="username" name="username"/>
                        <label htmlFor="title">Titel:</label>
                        <input type="text" id="title" name="title"/>
                        <textarea name="message" rows="10" cols="30" value="Samenvatting:">
                        </textarea>
                    </form>
                </section>
                }
            </SmallHeader>
            <section className="vacature-section">
                <form className="search">
                    <h2>Hier komt een zoek dingetje met filters enzo</h2>
                    <input type="radio" id="stad" name="stad"/><label htmlFor="stad">In welke stad zoek je iets?</label>
                    <textarea name="message" rows="3" cols="30" value="tekst enzo">
                    Heb je bepaalde voorkeuren?
                    </textarea>
                    <p>blablabla etc.etc.etc</p>
                </form>

                <section className="vacatures">
            <HulpVragenVac
                title="vervoer gezocht voor oude mevrouw"
                username="Mevr. de Vries"
                summary="Oudere mevrouw zou dolgraag naar de verjaardag van haar dochter willen in Dordrecht maar heeft geen vervoer"
            />
            <HulpVragenVac
                title="vervoer gezocht voor oude mevrouw"
                username="Mevr. de Vries"
                summary="Oudere mevrouw zou dolgraag naar de verjaardag van haar dochter willen in Dordrecht maar heeft geen vervoer"
            />
        </section>
        </section>
        </>
    )
}
export default HulpVragen;