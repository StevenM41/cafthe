import React, {useContext, useState} from 'react';
import axios from "axios";
import "../../styles/Login.css"
import {AuthContext} from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";

function Login(props) {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [capVal, setCapVal] = useState(null);

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
                <img src='/cafthe.png' alt={"LOGO"} />
            </div>
            <div className={"error"}>
                {errorMsg && (
                    <div className={"error-message"}>{errorMsg}</div>
                )}
            </div>
            <div className="right-page">
                <div className="container">
                    <h2>SE CONNECTER</h2>
                    <form className={"box-input"}>
                        <div className={"email-input"}>
                            <input
                                type={"email"}
                                className="input-top"
                                placeholder={"Saisir ici..."}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                required
                            />
                            <label>Votre adresse email</label>
                            <button type={"reset"}><img src='/button.png' alt={"Bouton reset"} onClick={(e) => { setEmail('')}}/></button>
                        </div>
                        <div className={"password-input"}>
                            <input
                                type={"password"}
                                className="input-left"
                                placeholder={"Saisir ici..."}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                required
                            />
                            <label>Votre mot de passe</label>
                            <button type={"reset"}><img src='/button.png' alt={"Bouton reset"}/></button>
                        </div>
                        <div className={"box-btn"}>
                            <button type={"submit"} disabled={!capVal} onClick={handleSubmit}>Connexion</button>
                        </div>
                        <Link to={"/reset-password"}>Mot de passe oublié ?</Link>
                        <div className={"divider"}></div>
                        <Link to={"/register"}>Créer un compte</Link>
                        <Link to={"/"}>Retour</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;