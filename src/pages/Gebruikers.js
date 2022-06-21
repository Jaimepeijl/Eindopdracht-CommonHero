import {useEffect, useState} from "react";
import axios from "axios";

function Gebruikers(){
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        async function fetchUsers(){
            try {
                const response = await axios.get('http://localhost:8080/users');
                setUsers(response.data);
                console.log(users)
            } catch (e) {
                console.error(e)
            }
        }
        fetchUsers();
    }, []);

 return(
 <div>
     <h1>Alle gebruikers</h1>
     <table>
         <thead>
         <tr>
             <th>ID</th>
             <th>Gebruikersnaam</th>
             <th>Email</th>
             <th>Naam</th>
             <th>Stad</th>
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
             </tr>
         })}
         </tbody>
     </table>
 </div>
 );
}

export default Gebruikers