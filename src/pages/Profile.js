import {useContext, useEffect, useState} from "react";
import axios from "axios";
import SmallHeader from "../components/SmallHeader";
import Footer from "../components/Footer";
import {AuthContext} from "../context/AuthContext";
import backgroundImage from "../assets/tk-qJDkJRTedNw-unsplash.jpg";
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

    const [username, setUsername]  = useState('');
    const [email, setEmail]  = useState('');
    const [name, setName]  = useState('');
    const [city, setCity]  = useState('');

    useEffect(()=>{
        async function getProfileData(){
            console.log(isAuth, user.username)
            const token = localStorage.getItem('token')
            try {
                const result = await axios.get(`http://localhost:8080/gebruikers/${user.username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                    });
                console.log(result.data)
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
        console.log(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    async function sendImage(e){
        e.preventDefault();
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
            console.log(result.data)
            toggleAddSuccess(true);
        } catch (e) {
            console.error(e)
        }
    }
    return<>
        <div>
            <SmallHeader
                backgroundImage={backgroundImage} title="boy with batmancape" height={'100vh'} >
            <div className="form-container">

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
                    <form className="login-form" onSubmit={sendImage}>
                        <h4>Hoi {user.username}!</h4>
                <h1>Upload hieronder je profiel foto</h1>
                <label htmlFor="user-image">
                    Kies afbeelding:
                    <input type="file" name="image-field" id="user-image" onChange={handleImageChange}/>
                </label>
                {addSucces === true &&
                    <h2>Afbeelding is toegevoegd!</h2>
                }
                {/*Als er een preview url is, dan willen we deze in een afbeelding tonen*/}
                {previewUrl &&
                    <label className="image-preview-container">
                        <h1>Zo kom je eruit te zien:</h1>
                        <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
                        <h3>Ben jij soms fotomodel?</h3>
                    </label>
                }
                <button type="submit">Uploaden</button>


                        <h4>Kloppen deze gegevens nog?</h4>
                        <section className="credentials">
                        <ul>
                        <li><h3>Naam: </h3> {name}</li>
                        <li><h3>Email: </h3>{email}</li>
                        <li><h3>Woonplaats: </h3> {city}</li>
                        </ul>
                        </section>
            </form>
                }
        </div>
            </SmallHeader>
        </div>
        <Footer/>
    </>
}
export default Profile