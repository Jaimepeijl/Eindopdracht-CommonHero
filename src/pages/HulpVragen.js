import React, {useContext, useState, useEffect} from 'react'
import './Vacatures.css'
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import HulpVragenVac from "../components/Vacs/HulpVragenVac";
import SmallHeader from "../components/SmallHeader/SmallHeader";
import backgroundImage from './../assets/old-and-young-maptionnaire.jpeg'
import axios from "axios";
import Footer from "../components/Footer/Footer";

function HulpVragen() {
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
                const response = await axios.get('http://localhost:8080/vacancies/search')
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
                backgroundImage={backgroundImage} title="people playing chess">
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
                                <HulpVragenVac vacInfo={info} key={info.title}/>
                            )
                        })
                    ) : (
                        vacInfo.map((info) => {
                            return (
                                <HulpVragenVac vacInfo={info} key={info.title}/>
                            )
                        })
                    )}
                </section>
            </section>
            <Footer/>
        </>
    )
}
export default HulpVragen;