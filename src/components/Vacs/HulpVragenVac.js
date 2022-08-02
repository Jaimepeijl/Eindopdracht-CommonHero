import React, {useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";


function HulpVragenVac({vacInfo}){
const id = vacInfo.id;
    return(
        <article className="HulpVragen">
            {Object.keys(vacInfo).length > 0 &&
                <>

                    <div className="title-username">
                        {vacInfo.file && <img src={vacInfo.file.url} alt={vacInfo.title}/>}
                        <h1>
                            <Link to={{
                                    pathname: `/hulp-vragen/${id}`,
                                    state: {id: {id},
                                        vactype: "search"}
                                }}>
                             {vacInfo.title}
                                </Link>
                        </h1>
                        <h2>{vacInfo.publisher}, {vacInfo.city}</h2>
                        <h3>{vacInfo.repeats}, {vacInfo.hours} uur </h3>
                        {vacInfo.repeats === 'Eenmalig' && <h2>{vacInfo.date}</h2>}
                    </div>
                    <p>{vacInfo.description}</p>

                </>
            }
        </article>
    )
}
export default HulpVragenVac