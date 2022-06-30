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
            async function getUserData(){
                const decodedToken = jwtDecode(token);
                try {
                    const response = await axios.get(`http://localhost:8080/gebruikers/${decodedToken.username}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    console.log(response.data)
                    toggleAuth({
                        isAuth: true,
                        user: {
                            email: response.data.email,
                            username:response.data.username,
                            id: response.data.id,
                        },
                        status: 'done'
                    })
                } catch (e) {
                    toggleAuth({
                        ...auth,
                        status: 'done',
                    });
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
                email: decodedToken.email,
                username: decodedToken.username,
            },
            status: 'done',
        });
        console.log("Gebruiker is ingelogd!")
        history.push('/profile')
    }
    function logOut(){
        history.push('/')
        toggleAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
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
            {auth.status === 'done' ? children : <p>Aan het laden...</p>}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;