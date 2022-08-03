import React, {useEffect, useState} from 'react'
import './Vacatures.css'
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import HulpAanbiedenVac from "../components/Vacs/HulpAanbiedenVac";
import SmallHeader from "../components/SmallHeader/SmallHeader";
import backgroundImage from './../assets/joseph-chan-zC7vO76hEqM-unsplash.jpg'
import axios from "axios";
import Footer from "../components/Footer/Footer";

function HulpAanbieden() {
    const {isAuth} = useContext(AuthContext);
    const history = useHistory();
    const [vacInfo, setVacInfo] = useState([])

    const [searchInput, setSearchInput] = useState('')
    const [filteredResults, setFilteredResults] = useState([])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if(searchInput !== ''){
            const filteredVacInfo = vacInfo.filter((info) => {
                return Object.values(info).join('').toLowerCase().includes(searchInput.toLowerCase())
                console.log(filteredVacInfo)
        })
        setFilteredResults(filteredVacInfo)
        }
        else{
            setFilteredResults(vacInfo)
        }
    }

    useEffect(()=> {
        async function getVacancies() {
            try {
                const response = await axios.get('http://localhost:8080/vacancies/offer')
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
                {!isAuth &&
                    <section className="welcome">
                        <h1>Welkom bij CommonHero</h1>
                        <h2>Ben je nieuw? Meld je dan hieronder aan!</h2>
                        <button
                            type="button"
                            onClick={() => history.push('/signup')}
                        >
                            Aanmelden
                        </button>
                    </section>
                }
                {isAuth &&
                <section className="welcome">
                    <h1>Wilt u een vacature plaatsen?</h1>
                    <h2>Klik dan op onderstaande knop</h2>
                    <button
                        type="button"
                        onClick={() => history.push('/vacmaken')}>
                        Gelijk een vacature maken
                    </button>
                </section>
                    }
            </SmallHeader>
            <section className="vacature-section">
                <form className="search">
                    <h2>Wat zoek je precies?</h2>
                    <input type='search'
                           placeholder='Ik zoek...'
                           onChange={(e)=> searchItems(e.target.value)}
                           />
                </form>

                <section className="vacatures">
                    {searchInput.length > 1 ? (
                        filteredResults.map((info) => {
                            return (
                                <HulpAanbiedenVac vacInfo={info} key={info.title}/>
                            )
                        })
                    ) : (
                        vacInfo.map((info) => {
                            return (
                                <HulpAanbiedenVac vacInfo={info} key={info.title}/>
                            )
                        })
                    )}
                </section>
            </section>
            <Footer/>
        </>
    )
}
export default HulpAanbieden;