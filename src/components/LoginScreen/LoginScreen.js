import React from "react";
import UserContext from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';



export default function LoginScreen() {
    const navigate = useNavigate();
    const {setToken, setUserData} = React.useContext(UserContext);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleLogin(event) {
        event.preventDefault();

        const body = {
            email,
            password
        };


        const loginRequest = axios.post("http://localhost:5000/sign-in", body);
        loginRequest.then(answer => {
            setToken({
                headers: {
                    Authorization: `Bearer ${answer.data}`
                }
            })
            alert("deu certo!");
            navigate("/historico");
        });

        loginRequest.catch(answer => {
            alert("Ocorreu um erro!")
        });

    }

    return(
        <Container>
            <Form onSubmit={handleLogin}>
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" required />
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
                <button type="submit">Entrar</button>
            </Form>
            <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
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