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
    const [vacInfo, setVacInfo] = useState([]);

    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [city, setCity] = useState('');

    const [sorted, toggleSorted] = useState(false);
    const [dateSort, setDateSort] = useState("Laag naar hoog");
    const [hourSort, setHourSort] = useState("Laag naar hoog");

    useEffect(()=>{
        console.log(searchInput, city)
        if(searchInput !== '' && city === ''){
            console.log("nu is die bij searchInput")
            console.log(searchInput)
            const filteredVacInfo = vacInfo.filter((info) => {
                return Object.values(info).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredVacInfo)
        } else if (searchInput === '' && city !== '') {
            console.log("nu is die bij city")
            console.log(city)
            const filteredVacInfo = vacInfo.filter((info) => {
                return Object.values(info.city).join('').toLowerCase().includes(city.toLowerCase())
            })
            setFilteredResults(filteredVacInfo)
        } else {
            console.log("nu is die nergens")
            setFilteredResults(vacInfo)
            setCity('')
            setSearchInput('')
            localStorage.clear()
        }
    }, [city, searchInput]);

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

    const sortByHours = () => {
        toggleSorted(true)
        let sortedVacInfo = vacInfo
        if  (city.length >  1 || searchInput.length >  1) {
            sortedVacInfo = filteredResults
        }
        if (hourSort === "Laag naar hoog") {
            setFilteredResults(
                sortedVacInfo.slice().sort((a,b) =>{
                    return b.hours - a.hours;
                })
            );
            setHourSort("Hoog naar laag")
        }
        if (hourSort === "Hoog naar laag") {
            setFilteredResults(
                sortedVacInfo.slice().sort((a,b) =>{
                    return a.hours - b.hours;
                })
            );
            setHourSort("Laag naar hoog")
        }
    };

    const sortByDate = () => {
        toggleSorted(true)
        if (dateSort === "Laag naar hoog") {
            setFilteredResults(
                filteredResults.slice().sort((a,b) =>{
                    return new Date(b.date) - new Date(a.date);
                })
            );
            setDateSort("Hoog naar laag")
        }
        if (dateSort === "Hoog naar laag") {
            setFilteredResults(
                filteredResults.slice().sort((a,b) =>{
                    return new Date(a.date) - new Date(b.date);
                })
            );
            setDateSort("Laag naar hoog")
        }
    };

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
                    <h3>Zoeken</h3>
                    <input type='search'
                           placeholder='Ik zoek...'
                           onChange={(e)=> setSearchInput(e.target.value)}
                    />
                    <h3>Zoek op stad</h3>
                    <input type='search'
                           placeholder='Bijv, Zaandam'
                           onChange={(e)=> setCity(e.target.value)}
                    />
                    <div className="sort">
                        <h3>Sorteren op aantal uur</h3>
                        <label htmlFor="hourSort" className="sort-button">
                            {hourSort}
                            <input type="checkbox"
                                   value={hourSort}
                                   name="hourSort"
                                   onClick={() => sortByHours()}/>
                        </label>
                        <h3>Sorteren op datum</h3>
                        <label htmlFor="dateSort" className="sort-button">
                            {dateSort}
                    <input type="checkbox"
                           value={dateSort}
                           name="dateSort"
                           onClick={() => sortByDate()}/>
                        </label>
                    </div>
                </form>

                <section className="vacatures">
                    {city.length >  1 || searchInput.length >  1 || sorted ? (
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