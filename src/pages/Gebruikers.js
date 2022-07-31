import {useEffect, useState} from "react";
import axios from "axios";
import SmallHeader from "../components/SmallHeader";
import backgroundImage from "../assets/clark-tibbs-oqStl2L5oxI-unsplash.jpg";
import "./Gebruikers.css"
import Footer from "../components/Footer";

function Gebruikers(){
    const token = localStorage.getItem('token')

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('')
    const [authority, setAuthority] = useState('')
    const [newAuthority, setNewAuthority] = useState('')
    const [button, toggleButton] = useState(false)
    const [userInfo, setUserInfo] = useState([])


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
            const response = await axios.get(`http://localhost:8080/gebruikers/${username}/authorities`);
            console.log(response.data)
            setUserInfo(response.data)
            setUsername(response.data[0].username);
            setAuthority(response.data[0].authority);
            console.log(authority)
        } catch (e) {
            console.error(e)
        }
    }
    function adjustAuthority(){
        if(authority === 'USER'){
            setNewAuthority('ADMIN')
        }
        else if(authority === 'ROLE_USER'){
            setNewAuthority('ADMIN')
        }
        else if (authority === 'ROLE_ADMIN'){
            setNewAuthority('USER')
        }
        else if (!authority){
            setNewAuthority('USER')
        }
        else {
            setNewAuthority('USER')
        }
    }
    async function toggleAuthorities(){
        console.log(authority)
        console.log(username)

        adjustAuthority();
        console.log(newAuthority)
        try {
            const response = await axios.post(`http://localhost:8080/gebruikers/${username}/authorities/${newAuthority}`);
            console.log(response)
        } catch (e) {
            console.error(e)
        }
    }

    async function deleteAuthority(){
        console.log(authority)
        console.log(newAuthority)
        try {
            const response = await axios.delete(`http://localhost:8080/gebruikers/${username}/authorities/${authority}`);
            console.log(response)
        } catch (e) {
            console.error(e)
        }
    }
return(
 <div>
     <SmallHeader backgroundImage={backgroundImage} title="Do Something Great" height={'80vh'}>

     </SmallHeader>
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
                 <td>{user.authorities.map((info) => { return (
                     <div key='authorityList'>{info.authority}</div>
                 )
                 })}</td>
             </tr>
         })}
         </tbody>
     </table>
     <section>

         <form onSubmit={getAuthorities}>
             Admin status toevoegen / weghalen:
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
                 Klik hier om de gebruiker op te halen
             </button>

             {button && <div>
                 <h3>Gebruikersnaam: </h3>
                 <p>{username}</p>
                 <h3>Authority: </h3>
                 {userInfo.map((info) => { return (
                     <div key='authorityList'>{info.authority}</div>
                 )
                 })}
             </div>}
         </form>
         {button && <button
         type="button"
         onClick={toggleAuthorities}
         >
             Wijzigen
         </button>}
         {button && <button
             type="button"
             onClick={deleteAuthority}
         >
             Verwijderen
         </button>}

     </section>
     <Footer/>
 </div>
 );
}

export default Gebruikers