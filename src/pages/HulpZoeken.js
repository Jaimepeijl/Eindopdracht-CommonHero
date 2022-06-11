import React from 'react'
import './Vacatures.css'
import Header from "../components/Header";

function HulpZoeken() {
    function HulpZoekenVac({title, username, summary}){
        return(
            <article className="HulpZoeken">
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
            <HulpZoekenVac
            title="Student zoekt vrijwilligerswerk voor in het weekend"
            username="Gerrit-Jan"
            summary="Ik ben een student van 22 en heb vaak in het weekend tijd over. Ik studeer geneeskunde dus zou eventueel daar wel iets mee willen doen. Laat weten als ik je ergens mee kan helpen!"
            />
            <HulpZoekenVac
            title="dignissimos asperiores"
            username="Tenetur quod"
            summary="Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"
            />
        </>
    )
}
export default HulpZoeken;