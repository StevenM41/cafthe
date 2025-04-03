import React, {useContext, useState} from 'react';

import {AuthContext} from "../context/AuthContext";
import "../styles/navbars.css"
import {GiHamburgerMenu} from "react-icons/gi";
import {GrClose} from "react-icons/gr";
import {Link} from "react-router-dom";
import {IoHomeSharp, IoSettings} from "react-icons/io5";
import {BsFillCupHotFill} from "react-icons/bs";
import {BiLogOut} from "react-icons/bi";
import {LuMessageSquareText} from "react-icons/lu";
import {FaCartShopping} from "react-icons/fa6";
import {useCart} from "../context/CartContext";

function Navbars() {
    const [active, setActive] = useState(false);
    const [showPopup, setShowPopup] = useState(false); // État pour gérer l'affichage du popup
    const { isAuthenticated, logout } = useContext(AuthContext);
    const { countArticle } = useCart();

    const handleLogout = () => {
        logout();
        setShowPopup(false); // Ferme le popup après la déconnexion
    };

    return (
        <nav className={'nav'}>
            <div className={"burger"} onClick={() => setActive(!active)}>
                {active ? <GrClose /> : <GiHamburgerMenu />}
            </div>
            <div className={`slider ${active ? 'active' : ''}`}>
                <label>
                    <span className={"separator first"}></span>
                    <ul>
                        <li>
                            <Link to={"/"} onClick={() => setActive(false)}>
                                <IoHomeSharp/> <p>Accueil</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/shop"} onClick={() => setActive(false)}>
                                <BsFillCupHotFill/>
                                <p>Boutique</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/card"} onClick={() => setActive(false)}>
                                <FaCartShopping/>
                                <p>Panier</p>
                                <span className={"quantity"}>{countArticle()}</span>
                            </Link>
                        </li>
                    </ul>
                    <span className={"separator"}></span>
                    <ul>
                        <li>
                            <Link to={"/forum"} onClick={() => setActive(false)}>
                                <LuMessageSquareText/>
                                <p>Forum</p>
                            </Link>
                        </li>
                    </ul>

                    {isAuthenticated && <span className={"separator last"}></span>}
                    <ul className={"footer"}>
                        {isAuthenticated && (
                            <>
                                <li>
                                    <Link to={"/account/"}>
                                        <IoSettings/>
                                        <p>Paramètre</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => setShowPopup(true)} className="logout-btn" to={''}>
                                        <BiLogOut/>
                                        <p>Déconnexion</p>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </label>
            </div>
            {showPopup && (
                <>
                    <span className="bg-blur" onClick={() => setShowPopup(false)}></span>
                    <div className="popup deconnexion">
                        <h2>Déconnexion</h2>
                        <p>Voulez-vous vraiment vous déconnecter ?</p>
                        <button className="success" onClick={handleLogout}>Déconnexion</button>
                        <button className="cancel" onClick={() => setShowPopup(false)}>Annuler</button>
                    </div>
                </>
            )}
        </nav>
    );
}
export default Navbars;