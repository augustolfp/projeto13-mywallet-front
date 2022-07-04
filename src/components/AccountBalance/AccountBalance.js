import React, { useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

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
            return userData.transactions.map((obj, index) => 
            <OpBracket key={index}>
                <div>{obj.description}</div>
                <Currency>{parseFloat(obj.value).toFixed(2)}</Currency>
            </OpBracket>);
        }
        else {
            return <h2>Carregando...</h2>
        }
    }

    return(
        <Container>
        <NameBox>
        <h1>Olá, {userData.name}</h1>
        </NameBox>
        <BalanceBox>
            <div>
                <PrintBalance />
            </div>
            <OpBracket>
                <NetBalance>SALDO</NetBalance>
                <Currency>{parseFloat(userData.balance).toFixed(2)}</Currency>
            </OpBracket>
        </BalanceBox>
        
        <button onClick={() => navigate("/adicionar")} >Nova entrada</button>
        </Container> 
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #8C11BE;

    button {
        width: 155px;
        height: 114px;
        background-color: #A328D6;
        border-style: none;
        border-radius: 5px;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-size: 17px;
        color: white;
    }
`
const NameBox = styled.div`
    margin: 25px;
    color: white;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 26px;
`
const BalanceBox = styled.div`
    font-family: 'Raleway', sans-serif;
    box-sizing: border-box;
    padding: 14px 18px 14px 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    width: 326px;
    height: 446px;
    border-radius: 5px;
`

const NetBalance = styled.div`
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 17px;
`
const Currency = styled.div`
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 17px;
`

const OpBracket = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
`