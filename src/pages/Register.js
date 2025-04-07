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

    const [errorMsg, setErrorMsg] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg([]); // Réinitialiser les messages d'erreur

        const trimmedName = user_name.trim();
        const trimmedPrenom = user_prenom.trim();
        const trimmedEmail = user_email.trim();
        const trimmedPhone = user_telephone.trim();
        const password = user_password;

        const newErrors = [];

        if (!trimmedName || !trimmedPrenom) {
            newErrors.push("\n- Le nom et le prénom ne peuvent pas être vides.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            newErrors.push("\n- L'adresse e-mail n'est pas valide.");
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        if (!passwordRegex.test(password)) {
            newErrors.push("\n- Le mot de passe doit contenir au moins 10 caractères, une majuscule, un chiffre et un caractère spécial.");
        }

        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(trimmedPhone) || trimmedPhone.length < 10) {
            newErrors.push("\n- Le numéro de téléphone doit contenir uniquement des chiffres et être valide.");
        }

        if (newErrors.length > 0) {
            setErrorMsg(newErrors);
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/users/register`,
                {
                    user_name: trimmedName,
                    user_prenom: trimmedPrenom,
                    user_email: trimmedEmail,
                    user_password: password,
                    user_telephone: trimmedPhone
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const { token, client } = response.data;
            login(token, client);

            navigate("/");
        } catch (error) {
            console.error("Erreur lors de la connexion", error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMsg([error.response.data.message]);
            } else {
                setErrorMsg(["Une erreur est survenue."]);
            }
        }
    };

    return (
        <div className={"login-page"}>
            <div className="left-page">
                <img src='/cafthe.png' alt={"LOGO"} />
            </div>
            {errorMsg.length > 0 && (
                <div className="popup-error">
                    {errorMsg.map((error, index) => (
                        <p key={index} className="error-message">
                            {error}
                        </p>
                    ))}
                </div>
            )}
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
                            <label>Votre prenom <span className={'require'}>*</span></label>
                            <button type={"reset"}><img src='/button.png' alt={"Bouton reset"} onClick={() => { setPrenom('')}}/></button>
                        </div>
                        <div className={"middle-input"}>
                            <input
                                type={"email"}
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
                                min={10}
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