import React from 'react'
import './Vacatures.css'
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import HulpAanbiedenVac from "../components/HulpAanbiedenVac";
import SmallHeader from "../components/SmallHeader";
import backgroundImage from './../assets/joseph-chan-zC7vO76hEqM-unsplash.jpg'

function HulpAanbieden() {
    const {isLoggedIn, logOutFunction} = useContext(AuthContext);
    const history = useHistory();

    return(
        <>
            <SmallHeader
                backgroundImage={backgroundImage} title="spiderman with kids">
                {!isLoggedIn &&
                <section className="welcome">
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
                    <textarea name="message" rows="3" cols="30" value="preferences">
                    Heb je bepaalde voorkeuren?
                    </textarea>
                    <p>blablabla etc.etc.etc</p>
                </form>

                <section className="vacatures">
                <HulpAanbiedenVac
                title="Student zoekt vrijwilligerswerk voor in het weekend"
                username="Gerrit-Jan"
                summary="Ik ben een student van 22 en heb vaak in het weekend tijd over. Ik studeer geneeskunde dus zou eventueel daar wel iets mee willen doen. Laat weten als ik je ergens mee kan helpen!"
            />
                <HulpAanbiedenVac
                    title="dignissimos asperiores"
                    username="Tenetur quod"
                    summary="Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"
                />
            </section>
            </section>

        </>
    )
}
export default HulpAanbieden;