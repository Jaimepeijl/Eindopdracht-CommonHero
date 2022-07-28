import React, {useState, useContext, useEffect} from "react";
import SmallHeader from "../components/SmallHeader";
import axios from "axios";
import {useLocation} from 'react-router-dom';
import backgroundImage from "../assets/tk-qJDkJRTedNw-unsplash.jpg";
import {AuthContext} from "../context/AuthContext";

function VacSearchPage() {
    const {isAuth} = useContext(AuthContext);
    const location = useLocation()
    const id = location.state.id.id
    const [thisVac, setThisVac] = useState([])
    const [publisherName, setPublisherName] = useState('')
    const [publisherEmail, setPublisherEmail] = useState('')
    const [respond, setRespond] = useState(false)
    console.log(id)


    useEffect(()=> {
        async function getVacancy() {
            try {
                console.log(id)
                const response = await axios.get(`http://localhost:8080/vacancies/search/${id}`
                )
                console.log(response.data)
                setThisVac(response.data);
            } catch (e) {
                console.error(e)
            }
        }
        getVacancy();
    }, [id]);

    function reageren(){
        setRespond(true)
        getUser()

    async function getUser() {
        try {
            console.log(id)
            const response = await axios.get(`http://localhost:8080/gebruikers/${thisVac.publisher}`
            )
            console.log(response.data)
            setPublisherName(response.data.name);
            setPublisherEmail(response.data.email)
        } catch (e) {
            console.error(e)
        }}}
return (
    <div>
        <SmallHeader
            backgroundImage={backgroundImage} title="boy with batmancape" height={'120vh'} >

            <article className="full-vac">
            {thisVac.file && <img src={thisVac.file.url} alt={thisVac.title}/>}
        <div className="title-username">
        <h1>{thisVac.name}</h1>
        <h2>{thisVac.publisher}</h2>
        <h3>{thisVac.hours} uur </h3>
        </div>
    <p>{thisVac.description}</p>
            {isAuth ?
            <button
            type="button"
            onClick={reageren}>Reageren
            </button>
            : <h1>Om te reageren moet je eerst inloggen!</h1>
            }

            {respond &&
            <section>
                <h1>Je kunt reageren door de gebruiker te mailen: </h1>
                {publisherName}
                {publisherEmail}
            </section>}
            </article>
        </SmallHeader>
    </div>
)
}
export default VacSearchPage;