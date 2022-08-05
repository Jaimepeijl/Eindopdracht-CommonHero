import React, {createContext, useEffect, useState} from "react";
import { useHistory} from 'react-router-dom';
import axios from "axios";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}){
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status:'pending',
    });
    const history = useHistory();

    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(token  ) { //TODO check of de token nog geldig is
            const decodedToken = jwtDecode(token);
            console.log(decodedToken.sub)
            async function getUserData(){
                try {
                    const response = await axios.get(`http://localhost:8080/gebruikers/${decodedToken.sub}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    console.log(response.data)
                    toggleAuth({
                        isAuth: true,
                        user: {
                            username:response.data.username,
                            email:response.data.email,
                            authority: response.data.authorities,
                        },
                        status: 'done'
                    });
                } catch (e) {
                    toggleAuth({
                        ...auth,
                        status: 'error',
                    });
                    localStorage.clear();
                    console.error(e);
                }
            }
            getUserData()
        } else {
            toggleAuth({
                ...auth,
                status: 'done',
            });
        }

    }, []);

    function logIn(token){
        console.log(token)
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        localStorage.setItem('token', token)

        toggleAuth({
            ...auth,
            isAuth: true,
            user: {
                username: decodedToken.sub,
            },
            status: 'done',
        });
        console.log("Gebruiker is ingelogd!")
        history.push('/profile')
    }
    function logOut(){
        toggleAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        localStorage.clear();
        history.push('/')
        console.log("Gebruiker is uitgelogd!")
    }
    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        logInFunction: logIn,
        logOutFunction: logOut,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === "done" && children}
            {auth.status === "pending" && <p>Loading...</p>}
            {auth.status === "error" && <p>Er ging wat mis! Refresh de pagina..</p>}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;