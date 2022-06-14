import React from "react";


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
export default HulpVragenVac