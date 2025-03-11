import React, {useContext, useEffect, useState} from 'react';

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

function Navbars() {
    const [active, setActive] = useState(false);
    const [panier, setPanier] = useState([]);

    const { isAuthenticated, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    }

    return (
        <nav>
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
                            <Link to={"/forum"} onClick={() => setActive(false)}>
                                <LuMessageSquareText/>
                                <p>Forum</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/cart"} onClick={() => setActive(false)}>
                                <FaCartShopping/>
                                <p>Panier</p>
                            </Link>
                        </li>
                    </ul>
                    <span className={"separator"}></span>
                    <span className={"separator last"}></span>
                    <ul className={"footer"}>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to={"/account/settings"}>
                                        <IoSettings/>
                                        <p>Paramètre</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/'} onClick={handleLogout}>
                                        <BiLogOut/>
                                        <p>Déconnexion</p>
                                    </Link>
                                </li>
                            </>
                        ) : null}
                    </ul>
                </label>
            </div>
        </nav>
    );
}

export default Navbars;