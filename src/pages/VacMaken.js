import "./VacMaken.css";
import React, {useEffect, useState} from 'react'
import './Vacatures.css'
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import HulpAanbiedenVac from "../components/HulpAanbiedenVac";
import SmallHeader from "../components/SmallHeader";
import backgroundImage from './../assets/joseph-chan-zC7vO76hEqM-unsplash.jpg'
import axios from "axios";
import Footer from "../components/Footer";

function HulpAanbieden() {
    const {isAuth, user} = useContext(AuthContext);
    const history = useHistory();
    const [addSucces, toggleAddSuccess] = useState(false);
    const token = localStorage.getItem('token')

    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isPending, setIsPending] = useState(false);

    const [publisher, setPublisher] = useState('');
    const [vacId, setVacId] = useState(null);
    const [title, setTitle] = useState('');
    const [hours, setHours] = useState(1);
    const [vactype, setVacType] = useState('');
    const [description, setDescription] = useState('');


    function button (){
        if(vactype === 'search'){history.push('/hulp-vragen')}
        else {history.push('/hulp-aanbieden')}
    }

    async function createOfferVacancy(e){
        e.preventDefault();
        await sendImage()
        console.log(title, hours, description);
        setVacType('offer')

        try{
            const response = await axios.post('http://localhost:8080/vacancies/offer', {
                publisher: user.username,
                title:  title,
                hours: hours,
                description: description,
            });
            console.log(response.data.id)
            setVacId(response.data.id)
            console.log(vacId)
            toggleAddSuccess(true);

        } catch (e) {
            console.error(e)
        }
    }
    async function createSearchVacancy(e){
        e.preventDefault();
        sendImage()
        console.log(title, hours, vactype, description);
        setVacType('search')

        try{
            const response = await axios.post('http://localhost:8080/vacancies/search', {
                publisher: user.username,
                title:  title,
                hours: hours,
                description: description,
            });
            console.log(response.data)
            toggleAddSuccess(true);

        } catch (e) {
            console.error(e)
        }
    }

    function handleImageChange(e){
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile)
        console.log(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }
    async function sendImage(){
        setIsPending(true)
        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await axios.post(`http://localhost:8080/vacancies/${vactype}/${vacId}/photo`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    },
                })
            setIsPending(false)
            toggleAddSuccess(true);
            console.log(result.data)
        } catch (e) {
            console.error(e)
        }
    }


    return(
        <>
            <SmallHeader
                backgroundImage={backgroundImage} title="spiderman with kids" height={'100vh'}>
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
                </section>}
                {isAuth &&
                <section className="hulpFormHeader">
                    {addSucces === true &&
                        <>
                            <div className="login-form">
                            <h1>Je vacature is aangemaakt!</h1>

                        </div>
                            <section className="image-container">
                                <h2>Je kunt ook nog een afbeelding toevoegen!</h2>
                            <label htmlFor="vacancy-image">
                                <input type="file" name="image-field" id="vacancy-image" className="add-image"onChange={handleImageChange}/>
                            </label>
                            {previewUrl &&
                                <div>
                                    <label className="image-preview-container">
                                    <h1>Zo komt de foto eruit te zien:</h1>
                                    <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
                                </label>
                                <button
                                type="button"
                                onClick={sendImage}
                                >
                                Afbeelding opslaan
                                </button>
                                </div>
                            }
                            </section>

                        <button
                        type="button"
                        className="submit-button"
                        onClick={button}
                            >
                        Naar de vacature pagina
                        </button>
                        </>}
                    {!addSucces === true &&

                        <section>
                            {vactype === '' &&
                            <div><h1>Wat voor vacature wil je aanmaken?</h1>
                            <button
                                type="button"
                                onClick={() =>setVacType('search')}>Ik wil graag hulp vragen</button>
                            <button
                                type="button"
                                onClick={() =>setVacType('offer')}>Ik bied hulp aan</button>
                            </div>}
                            {vactype === 'offer' &&
                        <form className="hulpForm" onSubmit={createOfferVacancy}>
                            <h1>Wilt u een vacature plaatsen?</h1>
                            <h2>Vul hieronder de velden in</h2>
                            <input
                                type="hidden"
                                id="publisher"
                                name="publisher"
                                value={publisher}/>
                            <label htmlFor="title">
                                <p>Titel:</p>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}/>
                            </label>
                            <label htmlFor="hours">
                                <p>Aantal uren (tussen 1 en 5):</p>
                                <input
                                    type="number"
                                    id="hours"
                                    name="hours"
                                    min="1"
                                    max="5"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}/>
                            </label>
                            <label htmlFor="Samenvatting:">
                                <p>Bericht:</p>
                                <textarea
                                    name="message"
                                    className="samenvatting"
                                    rows="10" cols="30"
                                    placeholder="Wat zoek je precies?:"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}/>
                            </label>

                            {!isPending && <button
                                type="submit"
                                className="submit-button">
                                Plaats de vacature!
                            </button>}
                            {isPending && <h3>Aan het laden!</h3>}
                        </form>}
                            {vactype === 'search' &&
                                <form className="hulpForm" onSubmit={createSearchVacancy}>
                                    <h1>Wilt u een vacature plaatsen?</h1>
                                    <h2>Vul hieronder de velden in</h2>
                                    <input
                                        type="hidden"
                                        id="publisher"
                                        name="publisher"
                                        value={publisher}/>
                                    <label htmlFor="title">
                                        <p>Titel:</p>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}/>
                                    </label>
                                    <label htmlFor="hours">
                                        <p>Aantal uren (tussen 1 en 5):</p>
                                        <input
                                            type="number"
                                            id="hours"
                                            name="hours"
                                            min="1"
                                            max="5"
                                            value={hours}
                                            onChange={(e) => setHours(e.target.value)}/>
                                    </label>

                                    <label htmlFor="Samenvatting:">
                                        <p>Bericht:</p>
                                        <textarea
                                            name="message"
                                            className="samenvatting"
                                            rows="10" cols="30"
                                            placeholder="Wat zoek je precies?:"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}/>
                                    </label>
                                    <button
                                        type="submit"
                                        className="submit-button">
                                        Plaats de vacature!
                                    </button>
                                </form>}
                        </section>}
                </section>
                }
            </SmallHeader>
            <Footer/>
        </>
    )
}
export default HulpAanbieden;