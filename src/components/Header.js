import React from 'react';
import "../styles/Header.css"
import Navbars from "./Navbars";

function Header(props) {
    return (
        <div className={"promo"}>
            <p>-15% avec le code promo CAFTHE41</p>
        </div>
    );
}

export default Header;