import React from "react";
import UserContext from "../../contexts/UserContext";
import axios from 'axios';



export default function LoginScreen() {
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
                    Authorization: `Bearer ${answer.data.token}`
                }
            })
            alert("deu certo!");
        });

        loginRequest.catch(answer => {
            alert("Ocorreu um erro!")
        });

    }

    return(
        <form onSubmit={handleLogin}>
            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required />
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="senha" required />
            <button type="submit">ENTRAR</button>
        </form>
    );
}