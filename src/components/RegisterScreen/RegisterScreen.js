import React from "react";
import UserContext from "../../contexts/UserContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';


export default function RegisterScreen() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeat_password, setRepeat_password] = React.useState("");

    function handleRegister(event) {
        event.preventDefault();

        const body = {
            name,
            email,
            password,
            repeat_password
        };

        const registerRequest = axios.post("http://localhost:5000/sign-up", body);
        registerRequest.then(answer => {
            alert("Deu certo!");
            navigate("/");
        });

        registerRequest.catch(answer => {
            alert("Ocorreu um erro!");
        });
    }


    return(
        <Container>
            <h1>MyWallet</h1>
            <Form onSubmit={handleRegister}>
                <input type="text" name="name" placeholder="Nome" onChange={e => setName(e.target.value)} required />
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" required />
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
                <input type="password" name="repeat password" value={repeat_password} onChange={e => setRepeat_password(e.target.value)} placeholder="Confirme a senha" required />

                <button type="submit">Cadastrar</button>
            </Form>
            <Link to="/">Já tem uma conta? Entre agora!</Link>
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

    a {
            font-family: 'Raleway', sans-serif;
            text-decoration: none;
            font-weight: 700;
            font-size: 15px;

        }

        a:link {
            color: white;
        }

        a:visited {
            color: white;
        }

    h1 {
        font-family: 'Saira Stencil One', cursive;
        color: white;
        font-size: 32px;
        margin-bottom: 24px;
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