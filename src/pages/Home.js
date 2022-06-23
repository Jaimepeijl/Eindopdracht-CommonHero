import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import HulpAanbiedenVac from "../components/HulpAanbiedenVac"
import HulpVragenVac from "../components/HulpVragenVac"
import Header from "../components/Header";
import Footer from "../components/Footer"
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";
import party from "./../assets/superhero.png"
import robot from "./../assets/robot.png"
import carRepair from "./../assets/car-repair.png"
import wheelchair from "./../assets/wheelchair.png"
import plant from "./../assets/plant.png"

function Home() {
    const history = useHistory();
    const {isLoggedIn, logOutFunction} = useContext(AuthContext);
    return (
        <>
            <Header>
                <section className="welcome">

                    <h1>Welkom bij CommonHero</h1>
                    {!isLoggedIn &&<>
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
                <h1>Of bekijk hieronder alvast het aanbod</h1>
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
                <div className="line1"></div>
            </div>

            <div className="webdev">
                <section>
                    <article>
                        <img src={party} alt="superhero-icon"/>
                        <h2>Party</h2>
                        <p>Good web design is how companies stand out from their competitors. High quality web design
                            leads to
                            increased user conversion and engagement. Through a proven web design process, we help
                            clients
                            launch websites and products that improve on their bottom line.
                        </p>
                    </article>
                    <article>
                        <img src={robot} alt="robot-icon"/>
                        <h2>Helping people from other cultures</h2>
                        <p>Modern websites need to be responsive and fully functional at all sizes. We develop all of
                            our sites
                            with a mobile first approach and ensure that our code quality is clean, organized and
                            performant.
                            Already have a design but need it developed? We’re here to help!</p>
                    </article>
                    <article>
                        <img src={carRepair} alt="car-repair-icon"/>
                        <h2>Have a special skill or tools?</h2>
                        <p>In order to build successful products you have to understand the user. We create user
                            personas,
                            wireframes and prototypes to test with users. This allows us to gather feedback which helps
                            to shape
                            the product and can quickly eliminate potential risks – saving you time and money.</p>
                    </article>
                    <article>
                        <img src={wheelchair} alt="wheelchair-icon"/>
                        <h2>Logo Design + Branding</h2>
                        <p>Nike, Apple, Coca-Cola, Starbucks. What do all of these brands have in common? Easily
                            recognizable
                            logos and brand identity. The best brands stand out from the crowd by having a clear and
                            unique
                            point of view. We will work with you to understand your vision and help create a unique
                            brand
                            identity and style guide for your company.</p>
                    </article>
                    <article>
                        <img src={plant} alt="plant-icon"/>
                        <h2>SEO</h2>
                        <p>Do you want your site to rank higher in search results? Google is constantly changing their
                            algorithms for how they rank pages. Don’t worry about constantly playing catch-up. We will
                            make sure
                            your website it optimized, providing you the best opportunities for organic search
                            exposure.</p>
                    </article>
                    <article>
                        <h2>Copy Writing</h2>
                        <p>Brand messaging needs to be clear, direct and easy to understand to be effective. A unique
                            tone of
                            voice will help you stand out from the crowd and build brand loyalty. We work with you to
                            establish
                            your brand bible and ensure your messaging is focused and targeted.</p>
                    </article>
                </section>
            </div>
            <div className="line2"></div>

            <Footer/>
        </>
    );
}

export default Home;
