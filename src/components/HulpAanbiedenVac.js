import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";


const HulpAanbiedenVac = ({vacInfo}) => {
    const history = useHistory();//TODO vacatures moeten naar aparte pagina verwijzen met alle info van de vac.
    return(
        <article className="HulpZoeken">
            {Object.keys(vacInfo).length > 0 &&
            <>
            <div className="title-username">
            <h1>{vacInfo.title}</h1>
                <h2>{vacInfo.publisher}</h2>
                <h3>{vacInfo.hours} uur </h3>
            </div>
                <p>{vacInfo.description}</p>
            </>
            }
        </article>
    )
}
export default HulpAanbiedenVac