import React, {useState, useContext, useEffect} from "react";
import SmallHeader from "../components/SmallHeader/SmallHeader";
import axios from "axios";
import {useHistory, useLocation} from 'react-router-dom';
import backgroundImage from "../assets/tk-qJDkJRTedNw-unsplash.jpg";
import {AuthContext} from "../context/AuthContext";
import Moment from 'moment';

function SingleVacPage() {
    const {isAuth, user} = useContext(AuthContext);
    const token = localStorage.getItem('token')
    const location = useLocation()
    const history = useHistory();

    const [thisVac, setThisVac] = useState([])
    const [publisherName, setPublisherName] = useState('')
    const [publisherEmail, setPublisherEmail] = useState('')
    const [respond, setRespond] = useState(false)

    const id = location.state.id.id
    const vactype = location.state.vactype
    const date = thisVac.date
    const formatDate = Moment(date).format('DD-MM-YYYY')
    const current = new Date();
    const currentDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const [title, setTitle] = useState('')
    const [hours, setHours] = useState('')
    const [city, setCity] = useState('')
    const [description, setDescription] = useState('')
    const [repeats, setRepeats] = useState('')
    const [vacDate, setVacDate] = useState('')
    const [addSucces, toggleAddSuccess] = useState(false);

    const [photoButton, togglePhotoButton] = useState(false)
    const [file, setFile] = useState([]);
    const [file2Big, setFile2Big] = useState('')
    const [previewUrl, setPreviewUrl] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [uploaded, setUploaded] = useState(false)

    const [myVac, toggleMyVac] = useState(false)
    const handleMyVac = () => {
        if ((user && user.username === publisherName) || (user && user.authority[0] && user.authority[0].authority === 'ADMIN')) {
    toggleMyVac(true)
        }
    }
    const [wijzigen, setWijzigen] = useState(false);
    const handleWijzigen = () => {
        setWijzigen(true)
    };
    const handlePhotoButton = () => {
        togglePhotoButton(true)
    };
    useEffect(()=> {
        async function getVacancy() {
            try {
                const response = await axios.get(`http://localhost:8080/vacancies/${vactype}/${id}`
                )
                setThisVac(response.data);
                setPublisherName(response.data.name)
                setTitle(response.data.title)
                setHours(response.data.hours)
                setCity(response.data.city)
                setDescription(response.data.description)
                setRepeats(response.data.repeats)
                setVacDate(response.data.date)
            } catch (e) {
                console.error(e)
            }
        }
        getVacancy();
        handleMyVac();
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
    async function updateVacancy(e) {
        e.preventDefault();
        console.log(publisherName, title, hours, city, description, repeats, vacDate)
        try {
            const response = await axios.put(`http://localhost:8080/vacancies/${vactype}/${id}`, {
                id: id,
                publisher: publisherName,
                title: title,
                hours: hours,
                city: city,
                description: description,
                repeats: repeats,
                date: vacDate,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data)
            toggleAddSuccess(true)
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
            const result = await axios.post(`http://localhost:8080/vacancies/${vactype}/${id}/photo`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    },
                })
            setIsPending(false)
            setUploaded(true)
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <div>
            <SmallHeader
                backgroundImage={backgroundImage} title="boy with batmancape" height={'120vh'} >

                {thisVac.title && !wijzigen && <article className="full-vac">
                    {thisVac.file && <img src={thisVac.file.url} alt={thisVac.title}/>}
                    <div className="title-username">
                        <h1>{thisVac.title}</h1>
                        <p>{thisVac.publisher}, {thisVac.city}</p>
                        <h3>{thisVac.repeats}, {thisVac.hours} uur </h3>
                        {thisVac.repeats === "Eenmalig" && <p>Op {formatDate}</p>}
                    </div>
                    <p>{thisVac.description}</p>
                    {user &&
                    <div>
                    {myVac ?
                        <div className="gebruikers-page-form-container">
                            <h3>Dit is uw eigen vacature. U kunt hierop niet reageren maar wel:</h3>
                            <section className="button-container">
                            <button
                                type="button"
                                onClick={deleteVacancy}>
                                Verwijderen
                            </button>
                            <button
                            type="button"
                            onClick={handleWijzigen}>
                                Aanpassen
                            </button>
                            <button
                            type="button"
                            onClick={handlePhotoButton}>
                                Afbeelding toevoegen
                            </button>
                            </section>
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
                        </div>}</div>}

                    {photoButton &&
                        <section>
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
                                    {isPending && <p>Aan het laden!</p>}
                                    {uploaded && <h2>De foto is toegevoegd!</h2>}
                                </div>}
                        </section>
                    }
                </article>}

                {wijzigen &&
                    <section className="full-vac">
                        <form className="vacForm" onSubmit={updateVacancy}>
                            <label htmlFor="title">
                                <p>Titel</p>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder={title}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}/>
                            </label>
                            <div>
                                <label htmlFor="repeats"><p>Wilt u vaker dan eens hulp aanbieden?:</p></label>
                                <select id="repeats" name="repeats" onSelect={(e) => setRepeats(e.target.value)}>
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
                                    name="date"
                                    value={vacDate}
                                    onChange={(e) => setVacDate(e.target.value)}
                                    min={currentDate}
                                    max="2024-08-01"
                                />
                            </label>
                            <label htmlFor="hours">
                                <p>Aantal uren (tussen 1 en 8):</p>
                                <h3>{hours}</h3>
                                <input
                                    type="range"
                                    id="hours"
                                    name="hours"
                                    placeholder={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    min="1"
                                    max="8"
                                />
                            </label>
                            <label htmlFor="city">
                                <p>In welke stad wilt u hulp aanbieden:</p>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder={city}
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </label>
                            <label htmlFor="description:">
                                <p>Bericht:</p>
                                <textarea
                                    className="description"
                                    rows="10" cols="30"
                                    placeholder="Leg kort uit waar u bij kunt helpen:"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    />
                            </label>
                            {!addSucces && <button
                                type="submit"
                                className="submit-button">
                                Opslaan
                            </button>}
                            {addSucces &&
                                <div className="aangepast">
                                    <h3>De vacature is aangepast!</h3>
                                <button
                                type="button"
                                className="submit-button"
                                onClick={history.goBack}>
                                Terug
                                </button>
                                </div>}
                        </form>
                    </section>}
            </SmallHeader>
        </div>
    )
}
export default SingleVacPage;