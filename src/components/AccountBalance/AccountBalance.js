import React, { useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


export default function AccountBalance() {
    const {token} = React.useContext(UserContext);
    const [userData, setUserdata] = React.useState([]);

    useEffect(() => {
        const requestBalance = axios.get("http://localhost:5000/get-balance", token);
        requestBalance.then(answer => {
            console.log(answer.data)
            setUserdata(answer.data);
        });
        requestBalance.catch(answer => console.log(answer));
    },[]);

    function PrintBalance() {
        if(userData.transactions) {
            return userData.transactions.map((obj, index) => <h2 key={index}>{obj.description}   {obj.value}</h2>);
        }
        else {
            return <h2>Carregando...</h2>
        }
    }

    return(
        <>
        <h1>Olá, {userData.name}</h1>
        <div>
            <PrintBalance />
        </div>
        </> 
    );
}