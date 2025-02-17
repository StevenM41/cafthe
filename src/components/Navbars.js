import React, {useContext} from 'react';

import {AuthContext} from "../context/AuthContext";
import {Link} from "react-router-dom";
import {IoCartSharp, IoHome} from "react-icons/io5";
import {FaSearch, FaShoppingBasket, FaUser, FaUserSlash} from "react-icons/fa";
import {MdFavorite, MdFavoriteBorder} from "react-icons/md";
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
                    <Link to={`/shop/favorite`}>
                        <i><MdFavorite/></i>
                        <span>Favoris</span>
                    </Link>
                </li>
                <li>
                    <Link to={"/shop/cart"}>
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

/**
 *
 *         <>
 *             <div className={"nav-links"}>
 *                 <div className={"logos"}>
 *                     <img src={'/cafthe.png'} alt={"cafthé"} />
 *                 </div>
 *                 <div className={"nav"}>
 *                     <nav>
 *                         <ul>
 *                             <li>
 *                                 <label>
 *                                     <FaSearch/>
 *                                     <input type={"text"} placeholder={"Veuillez entrée un article"}/>
 *                                 </label>
 *                             </li>
 *                         </ul>
 *                         <ul>
 *                             <li>
 *                                 <Link to={"/"}>
 *                                     <IoHome/>
 *                                     <p>Accueil</p>
 *                                 </Link>
 *                             </li>
 *                         </ul>
 *                         <ul>
 *                             <li>
 *                                 <Link to={"/shop"}>
 *                                     <FaShoppingBasket/>
 *                                     <p>Boutique</p>
 *                                 </Link>
 *                             </li>
 *                         </ul>
 *                         {isAuthenticated ? (
 *                             <>
 *                                 <ul>
 *                                     <li>
 *                                         <Link to={`/article/${user.nom}-${user.prenom}/favorite`}>
 *                                             <MdFavoriteBorder/>
 *                                             <p>Article Favoris</p>
 *                                         </Link>
 *                                     </li>
 *                                 </ul>
 *                                 <ul>
 *                                     <li>
 *                                         <Link to={"/article/cart"}>
 *                                             <IoCartSharp/>
 *                                             <p>Panier</p>
 *                                         </Link>
 *                                     </li>
 *                                 </ul>
 *                                 <ul>
 *                                     <li>
 *                                         <Link to={"/"} onClick={handleLogout}>
 *                                             <FaUserSlash/>
 *                                             <p>Déconnexion</p>
 *                                         </Link>
 *                                     </li>
 *                                 </ul>
 *                             </>
 *                         ) : (
 *                             <>
 *                                 <ul>
 *                                     <li>
 *                                         <Link to={`/login`}>
 *                                             <MdFavorite/>
 *                                             <p>Article Favoris</p>
 *                                         </Link>
 *                                     </li>
 *                                 </ul>
 *                                 <ul>
 *                                     <li>
 *                                         <Link to={"/login"}>
 *                                             <IoCartSharp/>
 *                                             <p>Panier</p>
 *                                         </Link>
 *                                     </li>
 *                                 </ul>
 *                                 <ul>
 *                                     <li>
 *                                         <div className={"login"}>
 *                                             <FaUser/>
 *                                             <div className={"menu"}>
 *                                                 <Link to={"/login"}>Se connecter</Link>
 *                                                 <Link to={"/register"}>Crée un compte</Link>
 *                                             </div>
 *                                         </div>
 *                                     </li>
 *                                 </ul>
 *                             </>
 *                         )}
 *                     </nav>
 *                 </div>
 *             </div>
 *         </>
 */