import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import HulpAanbiedenVac from "../components/HulpAanbiedenVac"
import HulpVragenVac from "../components/HulpVragenVac"
import Header from "../components/Header";
import Footer from "../components/Footer"
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";

function Home() {
    const history = useHistory();
    const {isLoggedIn, logOutFunction} = useContext(AuthContext);
    return (
        <>
            <Header>
                <section className="welcome">
                    {!isLoggedIn &&<>
                    <h1>Welkom bij CommonHero</h1>
            <h2>Ben je nieuw? Meld je dan hieronder aan!</h2>
                    <button
                type="button"
                onClick={() => history.push('/signup')}
                >
                Aanmelden
            </button>
                        </>}
                </section>
                <div className="line1"></div>
            </Header>
            <div className="vacature-container">
            <div className="title">
                <h1>Zoek nu</h1>
            </div>
            <div id="vacatures">
                <ul className="hulpGezocht">
                    <h2>Hulp Gezocht</h2>
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
                </ul>

                <ul className="hulpAanbod">
                    <h2>Hulp Aangeboden</h2>
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
                </ul>
            </div>
                <div className="line2"></div>
            </div>

            <Footer/>
        </>
    );
}

export default Home;
