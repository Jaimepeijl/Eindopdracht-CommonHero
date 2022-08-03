import {useEffect, useState, useContext} from "react";
import axios from "axios";
import SmallHeader from "../../components/SmallHeader/SmallHeader";
import backgroundImage from "../../assets/clark-tibbs-oqStl2L5oxI-unsplash.jpg";
import "./Gebruikers.css";
import Footer from "../../components/Footer/Footer";
import {AuthContext} from "../../context/AuthContext";

function Gebruikers(){
    const token = localStorage.getItem('token');
    const {isAuth} = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [inputUsername, setInputUsername] = useState('')
    const [authority, setAuthority] = useState('');
    const [newAuthority, setNewAuthority] = useState('');
    const [button, toggleButton] = useState(false);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(()=>{
        async function fetchUsers(){
            try {
                const response = await axios.get('http://localhost:8080/gebruikers');
                setUsers(response.data);
                console.log(response.data)
            } catch (e) {
                console.error(e)
            }
        }
        fetchUsers();
    }, []);

    async function getAuthorities(e){
        toggleButton(true)
        console.log(authority)
        e.preventDefault();
        console.log(username)
        try {
            const response = await axios.get(`http://localhost:8080/gebruikers/${username}/authorities`,
        {
            headers: {
                "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
            },
        });
            console.log(response.data)
            setUserInfo(response.data)
            console.log(userInfo[0].authority)
            setInputUsername(response.data[0].username)
            console.log(username)
            setAuthority(userInfo[0].authority);
            console.log(authority)
        } catch (e) {
            console.error(e)
        } adjustAuthority();
    }
    function adjustAuthority(){
        if(authority === "USER"){
            setNewAuthority("ADMIN")
        }
        else if(authority === "ROLE_USER"){
            setNewAuthority("ADMIN")
        }
        else if (authority === "ROLE_ADMIN"){
            setNewAuthority("USER")
        }
        else if (!authority){
            setNewAuthority("USER")
        }
        else {
            setNewAuthority("USER")
        }
    }
    async function toggleAuthorities(){
        console.log(authority)
        console.log(username)
        console.log(newAuthority)
        try {
            const response = await axios.post(`http://localhost:8080/gebruikers/${username}/authorities/${newAuthority}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
            console.log(response)
        } catch (e) {
            console.error(e)
        }
    }
    async function deleteAuthority(){
        console.log(authority)
        console.log(newAuthority)
        try {
            const response = await axios.delete(`http://localhost:8080/gebruikers/${username}/authorities/${authority}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                })
            console.log(response)
        } catch (e) {
            console.error(e)
        }
    }
return(
 <>
     <SmallHeader backgroundImage={backgroundImage} title="Do Something Great" height={'80vh'}>
     </SmallHeader>
     {isAuth &&
     <div className="gebruikers-page">
         <h1>De Admin Gebruikerspagina</h1>
         <section>
         <form onSubmit={getAuthorities} className="gebruikers-page-form-container">
             <h2>Authoriteit status aanpassen:</h2>
             <h3>Zoek hieronder naar de gebruikersnaam</h3>
             <label>
                 <input type="text"
                        name="username"
                        id="username"
                        placeholder="Gebruikersnaam"
                        onChange={(e) => setUsername(e.target.value)}
                 />
             </label>
             <button
                 type="submit">
                 Klik hier om de gegevens op te halen
             </button>
             {button && <div>
                 <h3>Gebruikersnaam: </h3>
                 <p>{inputUsername}</p>
                 <h3>Authoriteit(en): </h3>
                 {userInfo.map((info, index) => { return (
                     <div key={index}>{info.authority}</div>
                 )
                 })}
             </div>}
         </form>
         {button && <button
             type="button"
             onClick={toggleAuthorities}
         >
             Wijzigen naar {newAuthority}
         </button>}
         {button && <button
             type="button"
             onClick={deleteAuthority}
         >
             Verwijderen
         </button>}
     </section>
         <h1>Alle gebruikers</h1>
     <table>
         <thead>
         <tr>
             <th>ID</th>
             <th>Gebruikersnaam</th>
             <th>Naam</th>
             <th>Email</th>
             <th>Stad</th>
             <th>Foto</th>
             <th>Authoriteit(en)</th>
         </tr>
         </thead>
         <tbody>
         {users.map((user)=>{
             return <tr key={user.id}>
                 <td>{user.id}</td>
                 <td>{user.username}</td>
                 <td>{user.name}</td>
                 <td>{user.email}</td>
                 <td>{user.city}</td>
                 <td>{user.file && <img src={user.file.url} alt={user.name}/>}</td>
                 <td>{user.authorities.map((info, index) => { return (
                     <div key={index}>{info.authority}</div>
                 )
                 })}</td>
             </tr>
         })}
         </tbody>
     </table>
     </div>}
     <Footer/>

 </>
 );
}

export default Gebruikers