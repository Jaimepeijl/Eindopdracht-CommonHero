import React from 'react';
import { Link } from 'react-router-dom';
import HulpVragen from "./HulpVragen";
import HulpZoeken from "./HulpZoeken";
import Header from "../components/Header";

function Home() {
    return (
        <>
            <Header/>
            <div className="vacature-container">
            <h1>Zoek nu</h1>
            <div id="vacatures">
                <ul className="HulpVacatures">
                    <h2>Hulp Gezocht</h2>
                    <HulpVragen
                        title="vervoer gezocht voor oude mevrouw"
                        username="Mevr. de Vries"
                        summary="Oudere mevrouw zou dolgraag naar de verjaardag van haar dochter willen in Dordrecht maar heeft geen vervoer"
                    />
                    <HulpVragen
                        title="sit pariatur porro quaerat"
                        username="tempora quibusdam"
                        summary="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!"
                    />
                </ul>

                <ul className="HulpAanbod">
                    <h2>Hulp Aangeboden</h2>
                    <HulpZoeken
                        title="Student zoekt vrijwilligerswerk voor in het weekend"
                        username="Gerrit-Jan"
                        summary="Ik ben een student van 22 en heb vaak in het weekend tijd over. Ik studeer geneeskunde dus zou eventueel daar wel iets mee willen doen. Laat weten als ik je ergens mee kan helpen!"
                    />

                    <HulpZoeken
                        title="dignissimos asperiores"
                        username="Tenetur quod"
                        summary="Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"
                    />
                </ul>
            </div>
            </div>

            <section>
                <p>Als je ingelogd bent, bekijk dan de <Link to="/profile">Profielpagina</Link></p>
                <p>Je kunt ook <Link to="/signin">inloggen</Link> of jezelf <Link to="/signup">registeren</Link> als je nog geen
                    account hebt.</p>
            </section>
        </>
    );
}

export default Home;
