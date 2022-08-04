import "./VacMaken.css";
import React, {useState, useContext} from 'react';
import './Vacatures.css';
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import SmallHeader from "../components/SmallHeader/SmallHeader";
import backgroundImage from './../assets/pexels-uriel-marques-3497522.jpeg'
import axios from "axios";
import Footer from "../components/Footer/Footer";
import { useForm } from 'react-hook-form';

function HulpAanbieden() {
    const {isAuth, user} = useContext(AuthContext);
    const history = useHistory();
    const [addSucces, toggleAddSuccess] = useState(false);
    const token = localStorage.getItem('token');
    const { register, handleSubmit, formState: { errors },} = useForm();

    const [file, setFile] = useState([]);
    const [file2Big, setFile2Big] = useState('')
    const [previewUrl, setPreviewUrl] = useState('');
    const [isPending, setIsPending] = useState(false);

    const [publisher, setPublisher] = useState('');
    const [uploaded, setUploaded] = useState(false)
    const [vacId, setVacId] = useState(null);
    const [vactype, setVacType] = useState('');
    const current = new Date();
    const currentDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

function button (){
        if(vactype === 'search'){history.push('/hulp-vragen')}
        else {history.push('/hulp-aanbieden')}
    }

    async function createOfferVacancy(data){
        console.log(data);
        setVacType('offer')

        try{
            const response = await axios.post('http://localhost:8080/vacancies/offer', {
                publisher: user.username,
                title:  data.title,
                hours: data.hours,
                city: data.city,
                description: data.description,
                repeats: data.repeats,
                date: data.date,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                },
            });
            console.log(response.data.id)
            setVacId(response.data.id)
            console.log(vacId)
            toggleAddSuccess(true);

        } catch (e) {
            console.error(e)
        }
    }
    async function createSearchVacancy(data){
        console.log(data);
        setVacType('search')

        try{
            const response = await axios.post('http://localhost:8080/vacancies/search', {
                publisher: user.username,
                title:  data.title,
                hours: data.hours,
                city: data.city,
                description: data.description,
                repeats: data.repeats,
                date: data.date,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
            console.log(response.data.id)
            setVacId(response.data.id)
            toggleAddSuccess(true);

        } catch (e) {
            console.error(e)
        }
    }

    function handleImageChange(e){
        const uploadedFile = e.target.files[0];
        if(uploadedFile.size > 1048576){
            setFile2Big('Het bestand is te groot!')
        } else  {
            setFile2Big('')
        setFile(uploadedFile)
        console.log(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
        }
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
            setUploaded(true)
            console.log(result.data)
        } catch (e) {
            console.error(e)
        }
    }

    return(
        <>
            <SmallHeader
                backgroundImage={backgroundImage} title="Captain America cleaning windows" height={'120vh'}>
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
                                <p className="error-message">{file2Big}</p>
                            </label>
                            {previewUrl &&
                                <div>
                                    <label className="image-preview-container">
                                    <h1>Zo komt de foto eruit te zien:</h1>
                                    <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
                                </label>
                                    {!uploaded && <button
                                type="button"
                                onClick={sendImage}
                                >
                                Afbeelding opslaan
                                </button>}
                                    {uploaded && <h2>De foto is toegevoegd!</h2>}
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
                        <form className="hulpForm" onSubmit={handleSubmit(createOfferVacancy)}>
                            <h1>Wilt u een vacature plaatsen?</h1>
                            <h2>Vul hieronder de velden in</h2>
                            <input
                                type="hidden"
                                id="publisher"
                                {...register("publisher")}/>
                            <label htmlFor="title">
                                <p>Titel:</p>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="Bijv: Timmerhulp aangeboden"
                                    {...register("title", {required: "Je hebt natuurlijk wel een titel nodig!", maxLength: 50})}/>
                            </label>
                            {errors.title && <p className="error-message">{errors.title.message}</p>}
                            <div>
                                <label htmlFor="repeats"><p>Wilt u vaker dan eens hulp aanbieden?:</p></label>
                                <select id="repeats" {...register("repeats")}>
                                    <option value="Eenmalig">Nee, eenmalig</option>
                                    <option value="Dagelijks">Dagelijks</option>
                                    <option value="Wekelijks">Wekelijks</option>
                                    <option value="Maandelijks">Maandelijks</option>
                                </select>
                            </div>
                                <label htmlFor="date">
                                    <p>Op / vanaf datum:</p>
                                    <input
                                        type="date"
                                        id="date"
                                        {...register("date")}
                                        min={currentDate}
                                        max="2024-08-01"
                                    />
                                </label>
                            <label htmlFor="hours">
                                <p>Aantal uren (tussen 1 en 8):</p>
                                <input
                                    type="number"
                                    id="hours"
                                    {...register("hours", {required: "Hoeveel uur zal het (ongeveer) duren?"})}
                                    min="1"
                                    max="8"
                                />
                            </label>
                            {errors.hours && <p className="error-message">{errors.hours.message}</p>}
                            <label htmlFor="city">
                                <p>In welke stad wilt u hulp aanbieden:</p>
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="Bijv: Noordwijk aan Zee"
                                    {...register("city", {required: "We moeten natuurlijk wel weten waar je hulp nodig hebt!", maxLength: 50})}
                                    />
                            </label>
                            {errors.city && <p className="error-message">{errors.city.message}</p>}
                            <label htmlFor="description:">
                                <p>Bericht:</p>
                                <textarea
                                    className="description"
                                    rows="10" cols="30"
                                    placeholder="Leg kort uit waar u bij kunt helpen:"
                                    {...register("description", {required: "Leg kort uit waar je hulp bij nodig hebt", maxLength: { value: 255, message: "Maximaal 255 karakters aub"},})}/>
                            </label>
                            {errors.description && <p className="error-message">{errors.description.message}</p>}
                            {!isPending && <button
                                type="submit"
                                className="submit-button">
                                Plaats de vacature!
                            </button>}
                            {isPending && <h3>Aan het laden!</h3>}
                        </form>}
                            {vactype === 'search' &&
                                <form className="hulpForm" onSubmit={handleSubmit(createSearchVacancy)}>
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
                                            placeholder="Bijv: Gezocht: brunch maatje!"
                                            {...register("title", {required: true, maxLength: 50})}/>
                                    </label>
                                    <div>
                                        <label htmlFor="repeats"><p>Heeft u deze hulp vaker nodig?:</p></label>
                                        <select id="repeats" {...register("repeats")}>
                                            <option value="Eenmalig">Nee, eenmalig</option>
                                            <option value="Dagelijks">Dagelijks</option>
                                            <option value="Wekelijks">Wekelijks</option>
                                            <option value="Maandelijks">Maandelijks</option>
                                        </select>
                                    </div>
                                        <label htmlFor="date">
                                        <p>Op / vanaf datum:</p>
                                        <input
                                            type="date"
                                            id="date"
                                            {...register("date")}
                                            min={currentDate}
                                            max="2024-08-01"
                                        />
                                        </label>
                                    <label htmlFor="hours">
                                        <p>Aantal uren (tussen 1 en 8):</p>
                                        <input
                                            type="number"
                                            id="hours"
                                            {...register("hours")}
                                            min="1"
                                            max="8"
                                        />
                                    </label>
                                    <label htmlFor="city">
                                        <p>In welke stad zoekt u hulp:</p>
                                        <input
                                            type="text"
                                            id="city"
                                            placeholder="Bijv: Zaandam"
                                            {...register("city", {required: true, maxLength: 50})}/>
                                    </label>
                                    <label htmlFor="description:">
                                        <p>Bericht:</p>
                                        <textarea
                                            name="message"
                                            className="description"
                                            rows="10"
                                            placeholder="Waar zoekt u precies hulp bij?"
                                            {...register("description", {required: true, maxLength: { value: 255, message: "Maximaal 255 karakters aub"},})}/>
                                    </label>
                                    {!isPending &&
                                        <button
                                        type="submit"
                                        className="submit-button">
                                        Plaats de vacature!
                                        </button>}
                                    {isPending && <h3>Aan het laden!</h3>}
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