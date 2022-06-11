import React from 'react'
import './Vacatures.css'

function HulpZoeken({title, username, summary}) {
    return(
        <>
            <article className="HulpVragen">
                <h2>{title}</h2>
                <h3>{username}</h3>
                <p>{summary}</p>
            </article>
        </>
    )
}
export default HulpZoeken;