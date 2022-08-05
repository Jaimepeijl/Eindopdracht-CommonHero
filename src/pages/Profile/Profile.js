import {useContext, useEffect, useState} from "react";
import axios from "axios";
import SmallHeader from "../../components/SmallHeader/SmallHeader";
import Footer from "../../components/Footer/Footer";
import {AuthContext} from "../../context/AuthContext";
import backgroundImage from "../../assets/tk-qJDkJRTedNw-unsplash.jpg";
import "./Profile.css";
import React from "react";
import {useHistory} from "react-router-dom";

function Profile(){
    const {isAuth, user} = useContext(AuthContext);
    const token = localStorage.getItem('token')
    const history = useHistory();

    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [addSucces, toggleAddSuccess] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const[profilePic, setProfilePic]  = useState('');
    const [username, setUsername]  = useState('');
    const [email, setEmail]  = useState('');
    const [name, setName]  = useState('');
    const [city, setCity]  = useState('');

    const [wijzigen, setWijzigen] = useState(false);
    const handleWijzigen = () => {
        setWijzigen(true)
    };

    const [newEmail, setNewEmail]  = useState({email});
    const [newName, setNewName]  = useState({name});
    const [newCity, setNewCity]  = useState({city});

    useEffect(()=>{
        async function getProfileData(){
            const token = localStorage.getItem('token')
            try {
                const result = await axios.get(`http://localhost:8080/gebruikers/${user.username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                    });
                setProfilePic(result.data.file)
                setUsername(result.data.username)
                setEmail(result.data.email)
                setName(result.data.name)
                setCity(result.data.city)
            } catch (e) {
                console.error(e)
            }
        }
        getProfileData();
    }, [user]);

    function handleImageChange(e){
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile)
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    async function sendImage(){
        setIsPending(true)
        const formData = new FormData();
        formData.append("file", file);
        
        try {
            const result = await axios.post(`http://localhost:8080/gebruikers/${user.username}/photo`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    },
                })
            setIsPending(false)
            toggleAddSuccess(true);
        } catch (e) {
            console.error(e)
        }
    }

    async function updateProfile(){
        if (newEmail !== ''){
            setEmail(newEmail)
        }
        if (newName !== ''){
            setName(newName.name)
        }
        if (newCity !== ''){
            setCity(newCity)
        }
        try {
            const result = await axios.put(`http://localhost:8080/gebruikers/${user.username}`, {
                username: username,
                email: email,
                name: name,
                city: city,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.error(e)
        }}

    return<>
        <div>
            <SmallHeader
                backgroundImage={backgroundImage} title="boy with batmancape" height={'120vh'} >
            <div className="profile-container">

                {!isAuth &&
                    <section className="welcome">
                    <h1>Welkom op de profiel pagina</h1>
                    <h2>Laten we eerst even inloggen!</h2>
                    <button
                        type="button"
                        onClick={() => history.push('/signin')}
                    >
                        Inloggen
                    </button>
                </section>}
                {isAuth &&
                    <div className="login-form">
                    <form onSubmit={sendImage}>
                        <h4>Hoi {user.username}!</h4>
                        {profilePic &&
                            <section className="profile-pic">
                                <img src={profilePic.url} alt={name}/>
                            </section>}
                         <h1>{profilePic ? 'Wijzig' : 'Upload'} hieronder uw profiel foto</h1>
                <label htmlFor="user-image" className="user-image">
                    Kies uw afbeelding:
                    <input type="file" name="image-field" id="user-image" onChange={handleImageChange}/>
                </label>
                {addSucces === true &&
                    <h2>Afbeelding is toegevoegd!</h2>
                }
                {previewUrl &&
                    <label className="image-preview-container">
                        <h1>Zo komt u eruit te zien:</h1>
                        <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
                        <h3>Bent u soms fotomodel?</h3>
                    </label>
                }
                        {!isPending && <button type="submit">Uploaden</button>}
                        {isPending && <h3>Aan het laden!</h3>}
                    </form>
                        <h4>Kloppen deze gegevens nog?</h4>
                        {!wijzigen &&
                            <section className="credentials">
                            <ul>
                        <li><h3>Naam en achternaam: </h3> {name}</li>
                        <li><h3>Email: </h3>{email}</li>
                        <li><h3>Woonplaats: </h3> {city}</li>
                        </ul>
                                <button
                                type="button"
                                onClick={handleWijzigen}
                            >
                                Wijzigen
                            </button>
                        </section>
                        }
                        {wijzigen &&
                            <section className="credentials">
                                <form
                                onSubmit={updateProfile}
                                >
                                <label htmlFor="user-name">
                                    <h3>Naam en achternaam:</h3>
                                    <input
                                        type="text"
                                        name="user-name-field"
                                        id="user-name"
                                        placeholder={name}
                                        onChange={(e) => setNewName(e.target.value)}/>
                                </label>
                                <label htmlFor="user-email">
                                    <h3>Email:</h3>
                                    <input
                                        type="email"
                                        name="user-email-field"
                                        id="user-email"
                                        placeholder={email}
                                        onChange={(e) => setNewEmail(e.target.value)}/>
                                </label>
                                <label htmlFor="user-city">
                                    <h3>Woonplaats:</h3>
                                    <input
                                        type="city"
                                        name="user-city-field"
                                        id="user-city"
                                        placeholder={city}
                                        onChange={(e) => setNewCity(e.target.value)}/>
                                </label>
                                <button
                                    type="submit"
                                    className="submit-button">
                                    Opslaan
                                </button>
                                </form>
                            </section>}
                        <h4>Uw vacatures inzien, bewerken of verwijderen?</h4>
                        <button
                        className="button"
                        type="button"
                        onClick={() => history.push('/mijnvacs')}>
                        Naar uw vacature overzicht
                    </button>
                    </div>
                }
        </div>
            </SmallHeader>
        </div>
        <Footer/>
    </>
}
export default Profile