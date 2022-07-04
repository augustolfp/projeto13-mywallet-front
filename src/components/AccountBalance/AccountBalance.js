import React, { useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


export default function AccountBalance() {
    const {token} = React.useContext(UserContext);

    useEffect(() => {
        console.log(token)
        const requestBalance = axios.get("http://localhost:5000/get-balance", token);
        requestBalance.then(answer => {
            console.log(answer);
        });
        requestBalance.catch(answer => console.log(answer));
    },[]);

    return(
        <h1>nadaaaaaaaaaa</h1>
    );
}