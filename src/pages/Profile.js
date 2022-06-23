import {useState} from "react";
import axios from "axios";
import SmallHeader from "../components/SmallHeader";
import Footer from "../components/Footer";

function Profile(){
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [addSucces, toggleAddSuccess] = useState(false);

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
            const result = await axios.post('http://localhost:8080/{id}/photo', formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
            console.log(result.data)
        } catch (e) {
            console.error(e)
        }
    }
    return<>
        <div>
            <SmallHeader>
                <h1>Upload hieronder je profiel foto!</h1>
            </SmallHeader>
            <div className="form-container">

            <form className="login-form" onSubmit={sendImage}>
                <label htmlFor="user-image">
                    Kies afbeelding:
                    <input type="file" name="image-field" id="user-image" onChange={handleImageChange}/>
                </label>
                {/*Als er een preview url is, dan willen we deze in een afbeelding tonen*/}
                {previewUrl &&
                    <label>
                        Zo kom je eruit te zien:
                        <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
                    </label>
                }
                <button type="submit">Uploaden</button>
            </form>
        </div>
        </div>
        <Footer/>
    </>
}
export default Profile