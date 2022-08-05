import {useEffect} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {useContext, useState} from "react";
import HulpVragenVac from "../components/Vacs/HulpVragenVac";
import React from "react";
import HulpAanbiedenVac from "../components/Vacs/HulpAanbiedenVac";
import "./VacPage.css";
import backgroundImage from "../assets/road-trip-with-raj-o4c2zoVhjSw-unsplash.jpeg";
import SmallHeader from "../components/SmallHeader/SmallHeader";
import {useHistory} from "react-router-dom";

function MijnVacs(){
    const {isAuth, user} = useContext(AuthContext);
    const token = localStorage.getItem('token')
    const [vacSearchInfo, setVacSearchInfo] = useState([])
    const [vacOfferInfo, setVacOfferInfo] = useState([])
    const history = useHistory();

    const UserItems = (info, vacType) => {
            const filteredVacInfo = info.filter((info) => {
                return Object.values(info).join('').toLowerCase().includes(user.username.toLowerCase())
            })
        vacType(filteredVacInfo)
    }

    useEffect(()=> {
        async function getSearchVacancies() {
            try {
                const response = await axios.get('http://localhost:8080/vacancies/search', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
                const info = response.data
                UserItems(info, setVacSearchInfo)
            } catch (e) {
                console.error(e)
            }
        }
        getSearchVacancies();
    }, []);

    useEffect(()=> {
        async function getOfferVacancies() {
            try {
                const response = await axios.get('http://localhost:8080/vacancies/offer', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
                const info = response.data
                UserItems(info, setVacOfferInfo)
            } catch (e) {
                console.error(e)
            }
        }
        getOfferVacancies();
    }, []);
 return(
    <>

        <SmallHeader
        backgroundImage={backgroundImage} title="spiderman reading" height={'50vh'}>

        </SmallHeader>
        <div className="mijn-vacature-page">
            <h1>Dit is een overzicht van uw eigen vacatures</h1>
            <h2>Klik op een vacature om deze te verwijderen of te bewerken</h2>
            {isAuth && <div id="vacatures">

            <ul className="hulpAanbod">
                <h2>Hulp Aangeboden</h2>
                <section className="vacatures">
                    {vacOfferInfo && vacOfferInfo.map((info)=>{
                        return (
                            <div>
                                <HulpAanbiedenVac vacInfo={info} key={info.title}/>
                            </div>
                        )
                    })}
                    {vacOfferInfo.length < 1 &&
                        <section className="not-found">
                            <h3>Geen vacatures gevonden</h3>
                            <button
                                type="button"
                                onClick={() => history.push('/vacmaken')}>
                                Klik hier om gelijk een vacature te maken
                            </button>
                        </section>}
                </section>
            </ul>
            <ul className="hulpGezocht">
                <h2>Hulp Gezocht</h2>
                <section className="vacatures">
                    {vacSearchInfo && vacSearchInfo.map((info)=>{
                        return (
                            <HulpVragenVac vacInfo={info} key={info.title}/>
                        )
                    })}
                    {vacSearchInfo.length < 1 &&
                        <section className="not-found">
                            <h3>Geen vacatures gevonden</h3>
                                <button
                                    type="button"
                                    onClick={() => history.push('/vacmaken')}>
                                    Klik hier om gelijk een vacature te maken
                                </button>
                        </section>}
                </section>
            </ul>
        </div>}
    </div>
    </>
)
}
export default MijnVacs