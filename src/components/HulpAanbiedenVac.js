import React from "react";

function HulpAanbiedenVac({title, username, summary}){
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
export default HulpAanbiedenVac