import React from 'react'
import '../components/Vacatures.css'

function HulpVragen({title, username, summary}) {
    return(
        <article className="HulpVragen">
            <h2>{title}</h2>
            <h3>{username}</h3>
            <p>{summary}</p>
        </article>
    )
}
export default HulpVragen;