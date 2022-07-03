import React from "react";
import UserContext from "../../contexts/UserContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';


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
        <>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" placeholder="nome" onChange={e => setName(e.target.value)} required />
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required />
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="senha" required />
                <input type="password" name="repeat password" value={repeat_password} onChange={e => setRepeat_password(e.target.value)} placeholder="repita a senha" required />

                <button type="submit">CADASTRAR</button>
            </form>
            <Link to="/">Já tem uma conta? Faça login!</Link>
        </>
    );
}