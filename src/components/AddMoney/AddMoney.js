import React, { useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

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
        <>
            <form onSubmit={handleTransaction}>
                <input type="text" name="description" onChange={e => setDescription(e.target.value)} required />
                <input type="number" name="value" onChange={e => setValue(e.target.value)} required />
                <button type="submit">Salvar entrada</button>
            </form>
        </>
    );
}