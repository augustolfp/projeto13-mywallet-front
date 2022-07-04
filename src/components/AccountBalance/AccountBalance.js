import React, { useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


export default function AccountBalance() {
    const navigate = useNavigate();
    const {token} = React.useContext(UserContext);
    const {userData, setUserData} = React.useContext(UserContext);

    useEffect(() => {
        const requestBalance = axios.get("http://localhost:5000/get-balance", token);
        requestBalance.then(answer => {
            console.log(answer.data)
            setUserData(answer.data);
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
        <h1>Saldo: {parseFloat(userData.balance).toFixed(2)}</h1>
        <button onClick={() => navigate("/adicionar")} >Nova entrada</button>
        </> 
    );
}