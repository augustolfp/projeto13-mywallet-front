import '../assets/styles/reset.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen/LoginScreen";
import React from 'react';
import UserContext from "../contexts/UserContext";

export default function App() {
    const [token, setToken] = React.useState({});
    const [userData, setUserData] = React.useState({});
    return(
        <UserContext.Provider value={{token, setToken, userData, setUserData}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginScreen />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}