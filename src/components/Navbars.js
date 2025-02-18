import React, {useContext} from 'react';

import {AuthContext} from "../context/AuthContext";
import {Link} from "react-router-dom";
import {IoCartSharp, IoHome} from "react-icons/io5";
import {FaSearch, FaShoppingBasket} from "react-icons/fa";
import {MdFavorite} from "react-icons/md";
import "../styles/Header.css"
import {RxHamburgerMenu} from "react-icons/rx";

function Navbars() {
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
                        <i><FaShoppingBasket/></i>
                        <span>Boutique</span>
                    </Link>
                </li>
                <li>
                    <label>
                        <i><FaSearch /></i>
                        <span><input type={"text"} placeholder={"Veuillez saisir un article ici..."}/></span>
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