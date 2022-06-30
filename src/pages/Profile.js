import {useContext, useEffect, useState} from "react";
import axios from "axios";
import SmallHeader from "../components/SmallHeader";
import Footer from "../components/Footer";
import {AuthContext} from "../context/AuthContext";
import backgroundImage from "../assets/tk-qJDkJRTedNw-unsplash.jpg";
import "./Profile.css";
import React from "react";

function Profile(){
    const {user: {username} } = useContext(AuthContext);
    const token = localStorage.getItem('token')

    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [addSucces, toggleAddSuccess] = useState(false);

    useEffect(()=>{
        async function getProfileData(){
            const token = localStorage.getItem('token')
            try {
                const result = await axios.get(`http://localhost:8080/gebruikers/${username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                    });
            } catch (e) {
                console.error(e)
            }
        }
        getProfileData();
    }, []);

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
            const result = await axios.post(`http://localhost:8080/${username}/photo`, formData,
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

            <form className="login-form" onSubmit={sendImage}>
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
                    </label>
                }
                <button type="submit">Uploaden</button>
            </form>
        </div>
            </SmallHeader>
        </div>
        <Footer/>
    </>
}
export default Profile