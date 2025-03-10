import React, {useContext, useEffect, useState} from 'react';

import {AuthContext} from "../context/AuthContext";
import "../styles/navbars.css"
import {GiHamburgerMenu} from "react-icons/gi";
import {GrClose} from "react-icons/gr";
import {Link} from "react-router-dom";
import {IoHomeSharp, IoSettings} from "react-icons/io5";
import {BsFillCupHotFill} from "react-icons/bs";
import {BiLogOut} from "react-icons/bi";
import {LuLayoutDashboard, LuMessageSquareText} from "react-icons/lu";
import {FaCartShopping} from "react-icons/fa6";

function Navbars() {
    const [active, setActive] = useState(false);

    const [panier, setPanier] = useState([]);

    useEffect( () => {

    }, []);


    const { isAuthenticated, logout, isAdmin, isVendeur } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    }

    return (
        <nav>
            <div className={"burger"}>
                {active ? (
                    <GrClose onClick={() => setActive(false)}/>
                ) : (
                    <GiHamburgerMenu onClick={() => setActive(true)}/>
                )}
            </div>
            {active ? (
            <div className={"slider active"}>
                <label>
                    <span className={"separator first"}></span>
                    <ul>
                        <li>
                            <Link to={"/"} onClick={() => setActive(false)}>
                                <IoHomeSharp />
                                <p>Acceuil</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/shop"} onClick={() => setActive(false)}>
                                <BsFillCupHotFill />
                                <p>Boutique</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/forum"} onClick={() => setActive(false)}>
                                <LuMessageSquareText />
                                <p>Forum</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/cart"} onClick={() => setActive(false)}>
                                <FaCartShopping />
                                <span>0</span>
                                <p>Panier</p>
                            </Link>
                        </li>
                    </ul>
                    <span className={"separator"}></span>
                    <ul>
                        {isVendeur ? (
                            <>
                                <li>
                                    <Link to={"/dashboard"}>
                                        <LuLayoutDashboard />
                                        <p>Dashboard</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/account/settings"}>
                                        <IoSettings />
                                        <p>Paramètre</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/'} onClick={() => {handleLogout()}}>
                                        <BiLogOut /> <p>Déconnexion</p>
                                    </Link>
                                </li>
                            </>
                        ) : isAdmin ? (
                            <>
                                <li>
                                    <Link to={"/dashboard"}>
                                        <LuLayoutDashboard />
                                        <p>Dashboard</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/account/settings"}>
                                        <IoSettings />
                                        <p>Paramètre</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/'} onClick={() => {handleLogout()}}>
                                        <BiLogOut /> <p>Déconnexion</p>
                                    </Link>
                                </li>
                            </>
                        ) : isAuthenticated ? (
                            <>
                                <li>
                                    <Link to={"/account/settings"}>
                                        <IoSettings />
                                        <p>Paramètre</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/'} onClick={() => {handleLogout()}}>
                                        <BiLogOut /> <p>Déconnexion</p>
                                    </Link>
                                </li>
                            </>
                        ) : null}
                    </ul>
                    <div className={"footer"}>
                        <Link to={"/cgv"}>CGV</Link>
                        <Link to={'/mention-legale'}>Mention Légale</Link>
                        <Link to={"/cgu"}>CGU</Link>
                    </div>
                </label>
            </div>
            ) : (
            <div className={"slider"}>
                <label>
                    <span className={"separator first"}></span>
                    <ul>
                        <li>
                            <Link to={"/"}><IoHomeSharp /></Link>
                        </li>
                        <li>
                            <Link to={"/shop"}><BsFillCupHotFill /></Link>
                        </li>
                        <li>
                            <Link to={"/forum"}><LuMessageSquareText /></Link>
                        </li>
                        <li>
                            <Link to={"/cart"}>
                                <FaCartShopping />
                                <span>0</span>
                            </Link>
                        </li>
                    </ul>
                    <span className={"separator"}></span>
                    <ul>
                        {isVendeur ? (
                            <>
                                <li>
                                    <Link to={"/dashboard"}><LuLayoutDashboard /></Link>
                                </li>
                                <li>
                                    <Link to={"/account/settings"}><IoSettings /></Link>
                                </li>
                                <li>
                                    <Link to={'/'} onClick={() => {handleLogout()}}><BiLogOut /></Link>
                                </li>
                            </>
                        ) : isAdmin ? (
                            <>
                                <li>
                                    <Link to={"/dashboard"}><LuLayoutDashboard /></Link>
                                </li>
                                <li>
                                    <Link to={"/account/settings"}><IoSettings /></Link>
                                </li>
                                <li>
                                    <Link to={'/'} onClick={() => {handleLogout()}}><BiLogOut /></Link>
                                </li>
                            </>
                        ) : isAuthenticated ? (
                            <>
                                <li>
                                    <Link to={"/account/settings"}><IoSettings /></Link>
                                </li>
                                <li>
                                    <Link to={'/'} onClick={() => {handleLogout()}}><BiLogOut /></Link>
                                </li>
                            </>
                        ) : null}
                    </ul>
                    <div className={"footer"}>
                        <Link to={'/mention-legale'}>Mention Légale</Link>
                        <Link to={"/cgv"}>CGV</Link>
                        <Link to={"/cgu"}>CGU</Link>
                    </div>
                </label>
            </div>
            )}
        </nav>
    );
}

export default Navbars;