import React, {createContext, useState} from "react";
import { useHistory} from 'react-router-dom';

export const AuthContext = createContext(null);

function AuthContextProvider({children}){
    const history = useHistory();
    const [isAuth, toggleIsAuth] = useState(false);

    function logIn(){
        toggleIsAuth(true)
        console.log("Gebruiker is ingelogd!")
        history.push('/')
    }
    function logOut(){
        history.push('/')
        toggleIsAuth(false)
        console.log("Gebruiker is uitgelogd!")
    }

    const data = {
        isLoggedIn: isAuth,
        logInFunction: logIn,
        logOutFunction: logOut,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;