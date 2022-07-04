import React, { useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

export default function AddMoney() {
    const navigate = useNavigate();
    const {token} = React.useContext(UserContext);
    const {userData, setUserData} = React.useContext(UserContext);
    const [value, setValue] = React.useState(0);
    const [description, setDescription] = React.useState("");

    function handleTransaction(event) {
        event.preventDefault();

        const body = {
            value: parseFloat(value),
            description
        };

        const appendRequest = axios.put("http://localhost:5000/add-operation", body, token);
        appendRequest.then(answer => {
            alert("Deu certo!!!");
            navigate("/historico");
        });

        appendRequest.catch(answer => {
            alert("Ocorreu um erro!");
        });
    }

    return(
        <Container>
            <TitleBox>
                Nova entrada
            </TitleBox>
            <Form onSubmit={handleTransaction}>
                <input type="number" name="value" placeholder="Valor" onChange={e => setValue(e.target.value)} required />
                <input type="text" name="description" placeholder="Descrição" onChange={e => setDescription(e.target.value)} required />
                <button type="submit">Salvar entrada</button>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #8C11BE;

    input {
        box-sizing: border-box;
        height: 46px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        margin: 3px 0;
        padding: 0 6px;
        
        ::placeholder {
            color: black;
        }
    }

`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;

    button {
        height: 46px;
        border-style: none;
        border-radius: 4px;
        background-color: #A328D6;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-size:20px;
        color:white;
        margin: 3px 0 18px 0;
    }
`

const TitleBox = styled.div`
    margin: 25px;
    color: white;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 26px;
`