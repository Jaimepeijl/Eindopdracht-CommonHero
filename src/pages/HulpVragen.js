import React from 'react'
import './Vacatures.css'
import Header from "../components/Header";

function HulpVragen() {
    function HulpVragenVac({title, username, summary}){
        return(
            <article className="HulpVragen">
                <div className="title-username">
                    <h2>{title}</h2>
                    <h3>{username}</h3>
                </div>
                <p>{summary}</p>
            </article>
        )
    }
    return(
        <>
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
        </>
    )
}
export default HulpVragen;