import React, {useContext, useState} from 'react';
import axios from "axios";
import "../styles/Login.css"
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

function Login(props) {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const responce = await axios.post("http://localhost:3001/api/users/login", {user_email: email, user_password: password});
            const {token, client} = responce.data;

            console.log(token, client);

            login(token, client);
            navigate("/")
        } catch (error) {
            console.error("Erreur de lors de la connexion", error);
            if(error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Une erreur est survenue.")
            }
        }
    }

    return (
        <div className={"login-page"}>
            <div className="left-page">
                {/*<img />*/}
            </div>
            <div className="right-page">
                <div className="container">
                    <h2>SE CONNECTER</h2>
                    <form>
                        <div className="box-input">
                            <label>Votre adresse email</label>
                            <input
                                type={"email"}
                                className="input-top"
                                placeholder={"Saisir ici..."}
                                value={email}
                                onChange={(e) => { setEmail(e.target.value);}}
                                required
                            />
                            {/*<button></button>*/}
                            <label>Votre mot de passe</label>
                            <input
                                type={"password"}
                                className="input-left"
                                placeholder={"Saisir ici..."}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value);}}
                                required
                            />
                            {/*<button></button>*/}
                        </div>
                        {errorMsg && (
                            <div className={"error-message"}>{errorMsg}</div>
                        )}
                        <div className={"box-btn"}>
                            <button type={"submit"} onClick={handleSubmit}>Connexion</button>
                            <p>Mot de passe oublié ?</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;