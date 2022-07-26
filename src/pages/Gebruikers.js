import {useEffect, useState} from "react";
import axios from "axios";
import SmallHeader from "../components/SmallHeader";
import backgroundImage from "../assets/clark-tibbs-oqStl2L5oxI-unsplash.jpg";
import "./Gebruikers.css"
import Footer from "../components/Footer";

function Gebruikers(){
    const [users, setUsers] = useState([]);

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
             <th>Email</th>
             <th>Naam</th>
             <th>Stad</th>
             <th>Foto</th>
         </tr>
         </thead>
         <tbody>
         {users.map((user)=>{
             return <tr key={user.id}>
                 <td>{user.id}</td>
                 <td>{user.username}</td>
                 <td>{user.email}</td>
                 <td>{user.name}</td>
                 <td>{user.city}</td>
                 <td>{user.file && <img src={user.file.url} alt={user.name}/>}</td>
             </tr>
         })}
         </tbody>
     </table>
     <Footer/>
 </div>
 );
}

export default Gebruikers