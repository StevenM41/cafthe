import React, {useContext, useEffect, useState} from 'react';

import {AuthContext} from "../context/AuthContext";
import {Link} from "react-router-dom";
import {IoCartSharp, IoHome} from "react-icons/io5";
import {FaSearch} from "react-icons/fa";
import {MdFavorite} from "react-icons/md";
import "../styles/Header.css"
import {RxHamburgerMenu} from "react-icons/rx";
import {BsCupHotFill} from "react-icons/bs";
import axios from "axios";

function Navbars() {

    const [article, setArticle] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect( () => {
        axios.get(`http://localhost:301/api/search/${searchValue}`)
            .then((r) => setArticle(r.data))
            .catch((err) => console.error(err));
    }, [searchValue]);

    const { isAuthenticated, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    }

    return (
        <div className={"header"}>
            <Link to={"/"} className={"logo"}>
                <img src={"/cafthe.png"} alt={"cafthe_logo"} width={"140px"}/>
            </Link>

            <ul className={"navlist"}>
                <li>
                    <Link to={"/"}>
                        <i><IoHome/></i>
                        <span>Accueil</span>
                    </Link>
                </li>
                <li>
                    <Link to={"/shop"}>
                        <i><BsCupHotFill /></i>
                        <span>Boutique</span>
                    </Link>
                </li>
                <li>
                    <label>
                        <i><FaSearch /></i>
                        <span>
                            <input
                                type={"text"}
                                placeholder={"Veuillez saisir un article ici..."}
                                className={`search-input ${isFocused || searchValue ? "expanded" : ""}`}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => !searchValue && setIsFocused(false)}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </span>
                    </label>
                </li>
                <li>
                    <Link to={`/account/favorite`}>
                        <i><MdFavorite/></i>
                        <span>Favoris</span>
                    </Link>
                </li>
                <li>
                    <Link to={"/cart"}>
                        <i><IoCartSharp/></i>
                        <span>Panier</span>
                    </Link>
                </li>
            </ul>
            <div className={"right-content"}>
                {isAuthenticated ? (
                    <Link to={"/"} onClick={handleLogout} className={"nav-btn"}>
                        Déconnexion
                    </Link>
                ) : (
                    <Link to="/login" className={"nav-btn"}>

                        Connexion
                    </Link>
                )}
                <RxHamburgerMenu id={"menu-icon"}/>
            </div>
        </div>
    );
}

export default Navbars;