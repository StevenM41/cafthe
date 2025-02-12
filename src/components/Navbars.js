import React, {useContext} from 'react';

import {AuthContext} from "../context/AuthContext";
import {Link} from "react-router-dom";

function Navbars(props) {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    }

    return (
        <nav>
            <Link to="/">{/*<img src={} alt={}>*/}</Link>

            <div>
                {isAuthenticated ? (
                    <>
                        <div className={"login-container"}>
                            <p>
                                <span>{user.nom}</span>
                                {user.prenom}
                            </p>
                        </div>
                        <button onClick={handleLogout}>Se déconnecter</button>
                    </>
                ) : (
                    <>
                        <Link to={"/login"}>Se connecter</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbars;