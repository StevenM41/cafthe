import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {FaSearch, FaUser} from "react-icons/fa";
import {BiSolidSend} from "react-icons/bi";
import '../styles/Header.css'

function Profile({ user }) {
    const navigate = useNavigate();
    if(user.profile_img) return (<img src={'/profile-'+ user.id + ".png"} alt={"Profile avatars"} />);
    else return (<span className={"img_profile"} onClick={() => navigate(`/account/${user.id}/settings`)}><FaUser /></span>);
}

function Header() {
    const navigate  = useNavigate();

    const [text, setText] = useState("");
    const { isAuthenticated, isAdmin, isVendeur, user} = useContext(AuthContext);


    function initArticle(text) {
        navigate(`/shop/search?=${text}`)
        setText('')
    }

    return (
        <>
            <menu>
                <ul>
                    <li className={"logo_title"}>
                        <h1>CAFTHÉ</h1>
                        <img src={"/cafthe.png"} alt={"logo-cafthe"} />
                    </li>
                    <li className={"searchbar"}>
                        <span>
                            <FaSearch className={"search-logo"}/>
                        </span>
                        <input type={"text"} placeholder={"Enter un nom d'article... "} value={text} onChange={(e) => setText(e.target.value)}
                           onKeyDown={(e) => {
                               if(e.key === "Enter") {
                                   if(!text.trim()) { setText(''); return; }
                                   initArticle(text);
                               }
                           }
                        }
                        />
                        <BiSolidSend className={"send-logo"} onClick={() => {
                            if(!text.trim()) { setText(''); return; }
                            initArticle(text);
                        } }/>
                    </li>
                    <li className={"login"}>
                        {isAuthenticated ? ( isAdmin ? (
                            <div className={"cart-profile admin"}>
                                <Profile user={user}/>
                                <div className={"info"}>
                                    <p>Administrateur</p>
                                    <span className={"separator"}></span>
                                    <p>{user.nom} {user.prenom.toUpperCase()}</p>
                                </div>
                            </div>
                        ) : isVendeur ? (
                            <div className={"cart-profile vendeur"}>
                                <Profile user={user}/>
                                <div className={"info"}>
                                    <p>Vendeur</p>
                                    <span className={"separator"}></span>
                                    <p>{user.nom} {user.prenom.toUpperCase()}</p>
                                </div>
                            </div>
                        ) : (
                            <div className={"cart-profile client"}>
                                <Profile user={user}/>
                                <div className={"info"}>
                                    <p>{user.nom}</p>
                                    <span className={"separator"}></span>
                                    <p>{user.prenom.toUpperCase()}</p>
                                </div>
                            </div>
                        )) : (
                        <div className={"cart-connexion"}>
                            <Link to={"/login"}>Connexion</Link>
                            <span className={"separator"}></span>
                            <Link to={"/register"}>Inscription</Link>
                        </div>
                    )}
                    </li>
                </ul>
            </menu>
        </>
    );
}

export default Header;