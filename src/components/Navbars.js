import React, {useContext} from 'react';
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaHome, FaRegStar, FaUser, FaUserTimes } from "react-icons/fa";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import "../styles/Header.css";
import { IoCafeOutline } from "react-icons/io5";

function Navbars() {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    }

    return (
        <>
            <div className="promo">
                <p>-15% avec le code promo CAFTHE41</p>
            </div>
            <div className="nav-links">
                <div className="logo">
                    <img src="/cafthé.png" alt="logo-cafthe" />
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/" aria-label="Home">
                                <FaHome />
                                <p>Home</p>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link to="/shop" aria-label="Shop">
                                <IoCafeOutline />
                                <p>Shop</p>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <label className="search-bar">
                                <CiSearch />
                                <input type="search" placeholder="Please enter an article..." aria-label="Search" />
                            </label>
                        </li>
                    </ul>
                    {isAuthenticated ? (
                        <>
                            <ul>
                                <li>
                                    <Link to={`/client/${user.nom}/${user.prenom}/article/favorie`} aria-label="Favorite product">
                                        <FaRegStar />
                                        <p>Favorite product</p>
                                    </Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Link to="/shop/cart" aria-label="Cart">
                                        <PiShoppingCartSimpleLight />
                                        <p>Cart</p>
                                    </Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Link to="/" onClick={handleLogout} aria-label="Logout">
                                        <FaUserTimes />
                                        <p>Logout</p>
                                    </Link>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <ul>
                                <li>
                                    <Link to="/login" aria-label="Favorite product">
                                        <FaRegStar />
                                        <p>Favorite product</p>
                                    </Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Link to="/shop/cart" aria-label="Cart">
                                        <PiShoppingCartSimpleLight />
                                        <p>Cart</p>
                                    </Link>
                                </li>
                            </ul>
                            <ul>
                                <li className="login">
                                    <FaUser />
                                    <p>Login</p>
                                    <div className="menu-links">
                                        <Link to="/login" aria-label="Login">Login</Link>
                                        <Link to="/register" aria-label="Register">Register</Link>
                                    </div>
                                </li>
                            </ul>
                        </>
                    )}
                </nav>
            </div>
        </>
    );
};
export default Navbars;

