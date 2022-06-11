import {Link} from "react-router-dom";
import React from "react";
import "./Footer.css"

function Footer (){
    return(
        <>
            <section className="Footer">
            <p>Als je ingelogd bent, bekijk dan de <Link to="/profile">Profielpagina</Link></p>
            <p>Je kunt ook <Link to="/signin">inloggen</Link> of jezelf <Link to="/signup">registeren</Link> als je nog geen
                account hebt.</p>
            </section>

        </>
    )
}
export default Footer