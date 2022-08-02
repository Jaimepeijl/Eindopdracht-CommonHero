import React, {useState, useContext, useEffect} from "react";
import SmallHeader from "../components/SmallHeader/SmallHeader";
import axios from "axios";
import {useLocation} from 'react-router-dom';
import backgroundImage from "../assets/tk-qJDkJRTedNw-unsplash.jpg";
import {AuthContext} from "../context/AuthContext";
import Moment from 'moment';

function SingleVacPage() {
    const {isAuth, user} = useContext(AuthContext);
    const token = localStorage.getItem('token')
    const location = useLocation()

    const [thisVac, setThisVac] = useState([])
    const [publisherName, setPublisherName] = useState('')
    const [publisherEmail, setPublisherEmail] = useState('')
    const [respond, setRespond] = useState(false)

    const id = location.state.id.id
    const vactype = location.state.vactype
    const date = thisVac.date
    const formatDate = Moment(date).format('DD-MM-YYYY')
    console.log(formatDate)
    console.log(vactype)
    console.log(id)

    useEffect(()=> {
        async function getVacancy() {
            try {
                console.log(id)
                const response = await axios.get(`http://localhost:8080/vacancies/${vactype}/${id}`
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

    async function deleteVacancy() {
        try {
            const response = await axios.delete(`http://localhost:8080/vacancies/${vactype}/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data)
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <div>
            <SmallHeader
                backgroundImage={backgroundImage} title="boy with batmancape" height={'120vh'} >

                {thisVac.title && <article className="full-vac">
                    {thisVac.file && <img src={thisVac.file.url} alt={thisVac.title}/>}
                    <div className="title-username">
                        <h1>{thisVac.title}</h1>
                        <p>{thisVac.publisher}, {thisVac.city}</p>
                        <h3>{thisVac.repeats}, {thisVac.hours} uur </h3>
                        {thisVac.repeats === "Eenmalig" && <p>Op {formatDate}</p>}
                    </div>
                    <p>{thisVac.description}</p>
                    {user.username === thisVac.publisher ?
                        <div className="gebruikers-page-form-container">
                            <h3>Dit is uw eigen vacature. U kunt hierop niet reageren maar wel:</h3>
                            <button
                                type="button"
                                onClick={deleteVacancy}>
                                Verwijderen
                            </button>
                            <button>Aanpassen</button>
                        </div>
                        : <div>
                            {!respond &&
                                <div>
                                    {isAuth ?
                                        <button
                                            type="button"
                                            onClick={reageren}>Reageren
                                        </button>
                                        : <h3>Om te reageren moet u eerst inloggen</h3>
                                    }
                                </div>}

                            {respond &&
                                <section>
                                    <h1>U kunt reageren door de gebruiker te mailen: </h1>
                                    <div className="respond">
                                        <h3>Naam: </h3>{publisherName}
                                        <h3>Email: </h3>{publisherEmail}
                                    </div>
                                </section>}
                        </div>}
                </article>}
            </SmallHeader>
        </div>
    )
}
export default SingleVacPage;