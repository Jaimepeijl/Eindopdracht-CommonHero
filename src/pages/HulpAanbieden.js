import React, {useEffect, useState} from 'react'
import './Vacatures.css'
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import HulpAanbiedenVac from "../components/HulpAanbiedenVac";
import SmallHeader from "../components/SmallHeader";
import backgroundImage from './../assets/joseph-chan-zC7vO76hEqM-unsplash.jpg'
import axios from "axios";

function HulpAanbieden() {
    const {isLoggedIn, user, logOutFunction} = useContext(AuthContext);
    const history = useHistory();
    const [vacInfo, setVacInfo] = useState([])

    useEffect(()=>{
        async function getVacancies(){
            try{
                const response = await axios.get('http://localhost:8080/vacancies')
                setVacInfo(response.data)
                console.log(vacInfo)
            } catch (e) {
                console.error(e)
            }
        }
        getVacancies();
    }, []);

    return(
        <>
            <SmallHeader
                backgroundImage={backgroundImage} title="spiderman with kids" height={'90vh'}>
                {/*{!isLoggedIn &&*/}
                {/*<section className="welcome">*/}
                {/*    <h1>Welkom bij CommonHero</h1>*/}
                {/*    <h2>Ben je nieuw? Meld je dan hieronder aan!</h2>*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        onClick={() => history.push('/signup')}*/}
                {/*    >*/}
                {/*        Aanmelden*/}
                {/*    </button>*/}
                {/*</section>*/}
                }
                {/*{isLoggedIn &&*/}
                <section className="welcome">
                    <h1>Wilt u een vacature plaatsen?</h1>
                    <h2>Klik dan op onderstaande knop</h2>
                    <button
                        type="button"
                        onClick={() => history.push('/vacmaken')}>
                        Gelijk een vacature maken
                    </button>
                </section>
                    {/*}*/}
            </SmallHeader>
            <section className="vacature-section">
                <form className="search">
                    <h2>Hier komt een zoek dingetje met filters enzo</h2>
                    <input type="radio" id="stad" name="stad"/><label htmlFor="stad">In welke stad zoek je iets?</label>
                    <textarea name="message" rows="3" cols="30" value="preferences">
                    Heb je bepaalde voorkeuren?
                    </textarea>
                    <p>blablabla etc.etc.etc</p>
                </form>

                <section className="vacatures">
                    {vacInfo && vacInfo.map((info)=>{
                        return <HulpAanbiedenVac vacInfo={info} key={info.title}/>
                    })}
            </section>
            </section>

        </>
    )
}
export default HulpAanbieden;