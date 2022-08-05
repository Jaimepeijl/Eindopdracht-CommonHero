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
        const token = localStorage.getItem('token');

        if(token) {
            const decodedToken = jwtDecode(token);
            getUserData(decodedToken.sub, token)
        } else {
            toggleAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

            async function getUserData(id, token){
                try {
                    const response = await axios.get(`http://localhost:8080/gebruikers/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    toggleAuth({
                        ...auth,
                        isAuth: true,
                        user: {
                            username:response.data.username,
                            email:response.data.email,
                            authority: response.data.authorities,
                        },
                        status: 'done'
                    });
                } catch (e) {
                    localStorage.clear();
                    console.error(e);

                    toggleAuth({
                        ...auth,
                        status: 'error',
                    });
                }
            }

    function logIn(token){
        const decodedToken = jwtDecode(token);
        localStorage.setItem('token', token)
        getUserData(decodedToken.sub, token)
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
            {auth.status === "pending" && <p>Aan het laden...Dit kan niet lang duren!</p>}
            {auth.status === "error" && <p>Er ging iets mis! Refresh de pagina..</p>}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;