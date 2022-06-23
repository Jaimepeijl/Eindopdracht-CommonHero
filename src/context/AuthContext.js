import React, {createContext, useEffect, useState} from "react";
import { useHistory} from 'react-router-dom';
import axios from "axios";

export const AuthContext = createContext({
    isAuth: false,
    user: null,
});

function AuthContextProvider({children}){
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
    });
    const history = useHistory();

    // useEffect(()=>{
    //     const token = localStorage.getItem('token')
    //
    //     if(token) {
    //         async function getUserData(){
    //             try {
    //                 const response = await axios.get({URL}, {
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authorization: `Bearer ${token}`,
    //                     }
    //                 })
    //             } catch (e) {
    //                 console.error(e);
    //             }
    //         }
    //
    //     } else {
    //
    //     }
    //
    // }, []);

    function logIn(){
        toggleAuth({
            isAuth: true,
            user: {
                email: 'jaime@novi.nl',
                username: 'jaimepeijl'
            }
        });
        console.log("Gebruiker is ingelogd!")
        history.push('/')
    }
    function logOut(){
        history.push('/')
        toggleAuth({
            isAuth: false,
            user: null,
        });
        console.log("Gebruiker is uitgelogd!")
    }

    const contextData = {
        isAuth: auth.isAuth,
        logInFunction: logIn,
        logOutFunction: logOut,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;