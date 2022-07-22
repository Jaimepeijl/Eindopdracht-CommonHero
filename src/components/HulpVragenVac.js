import React from "react";


function HulpVragenVac({title, username, summary, hours}){
    return(
        <article className="HulpVragen">
            <div className="title-username">
                <h1>{title}</h1>
                <h2>{username}</h2>
                <h3>{hours}</h3>
            </div>
            <p>{summary}</p>
        </article>
    )
}
export default HulpVragenVac