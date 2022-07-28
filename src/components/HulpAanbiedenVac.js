import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function HulpAanbiedenVac ({vacInfo}) {
    const id = vacInfo.id;
    return(
        <article className="HulpZoeken">
            {Object.keys(vacInfo).length > 0 &&
            <>
            <div className="title-username">
                {vacInfo.file && <img src={vacInfo.file.url} alt={vacInfo.title}/>}
            <h1>
                <Link to={{
                    pathname: `/hulp-aanbieden/${id}`,
                    state: {id: {id}}
                }}>
                    {vacInfo.title}
                </Link>
            </h1>
                <h2>{vacInfo.publisher}, {vacInfo.city}</h2>
                <h3>{vacInfo.hours} uur </h3>
            </div>
                <p>{vacInfo.description}</p>
            </>
            }
        </article>
    )
}
export default HulpAanbiedenVac