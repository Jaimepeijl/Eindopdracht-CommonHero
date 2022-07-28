import React, {useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";


function HulpVragenVac({vacInfo}){
const id = vacInfo.id;
    return(
        <article className="HulpVragen">
            {Object.keys(vacInfo).length > 0 &&
                <>
                    {vacInfo.file && <img src={vacInfo.file.url} alt={vacInfo.title}/>}
                    <div className="title-username">
                        <h1>
                            <Link to={{
                                    pathname: `/hulp-vragen/${id}`,
                                    state: {id: {id}}
                                }}>
                             {vacInfo.title}
                                </Link>
                        </h1>
                        <h2>{vacInfo.publisher}</h2>
                        <h3>{vacInfo.hours} uur </h3>
                    </div>
                    <p>{vacInfo.description}</p>

                </>
            }
        </article>
    )
}
export default HulpVragenVac