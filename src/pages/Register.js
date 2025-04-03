import React, {useContext, useState} from 'react';
import axios from "axios";
import "../styles/Register.css"
import {AuthContext} from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";

function Register() {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();

    const [user_name, setName] = useState("")
    const [user_prenom, setPrenom] = useState("")
    const [user_email, setEmail] = useState("")
    const [user_password, setPassword] = useState("")
    const [user_telephone, setPhone] = useState("")

    const [errorMsg, setErrorMsg] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const responce = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`,
                {user_name: user_name, user_prenom: user_prenom, user_email: user_email, user_password: user_password, user_telephone: user_telephone}, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            const {token, client} = responce.data;
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
            <div className={"pupup-error"}>
                {errorMsg && (
                    <p className={"error-message"}>{errorMsg}</p>
                )}
            </div>
            <div className="right-page">
                <div className="container">
                    <h2>INSCRIPTION</h2>
                    <form className={"box-input"}>
                        <div className={"first-input"}>
                            <input
                                type={"text"}
                                className="input-top"
                                placeholder={"Saisir ici..."}
                                value={user_name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                required
                            />
                            <label>Votre nom <span className={'require'}>*</span></label>
                            <button type={"reset"}><img src='/button.png' alt={"Bouton reset"} onClick={() => { setName('')}}/></button>
                        </div>
                        <div className={"middle-input"}>
                            <input
                                type={"text"}
                                className="input-middle"
                                placeholder={"Saisir ici..."}
                                value={user_prenom}
                                onChange={(e) => {
                                    setPrenom(e.target.value)
                                }}
                                required
                            />
                            <label>Votre adresse email <span className={'require'}>*</span></label>
                            <button type={"reset"}><img src='/button.png' alt={"Bouton reset"} onClick={() => { setPrenom('')}}/></button>
                        </div>
                        <div className={"middle-input"}>
                            <input
                                type={"text"}
                                className="input-middle"
                                placeholder={"Saisir ici..."}
                                value={user_email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                required
                            />
                            <label>Votre adresse email <span className={'require'}>*</span></label>
                            <button type={"reset"}><img src='/button.png' alt={"Bouton reset"} onClick={() => { setEmail('')}}/></button>
                        </div>
                        <div className={"middle-input"}>
                            <input
                                type={"password"}
                                className="input-middle"
                                placeholder={"Saisir ici..."}
                                value={user_password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                required
                            />
                            <label>Votre mot de passe <span className={'require'}>*</span></label>
                            <button type={"reset"}><img src='/button.png' alt={"Bouton reset"} onClick={() => { setPassword('')}}/></button>
                        </div>
                        <div className={"last-input"}>
                            <input
                                type={"tel"}
                                className="input-left"
                                placeholder={"Saisir ici..."}
                                value={user_telephone}
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                }}
                                required
                            />
                            <label>Votre numéro de téléphone <span className={'require'}>*</span></label>
                            <button type={"reset"}><img src='/button.png' alt={"Bouton reset"} onClick={() => { setPhone('')}}/></button>
                        </div>
                        <div className={"box-btn"}>
                            <button type={"submit"} onClick={handleSubmit}>Inscription</button>
                        </div>
                        <div className={"divider"}></div>
                        <Link to={"/login"}>Se connecter</Link>
                        <Link to={"/"}>Retour</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;