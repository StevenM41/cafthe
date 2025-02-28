import React from 'react';
import "../styles/Header.css"
import Navbars from "./Navbars";

function Header() {
    return (
        <>
            <div className={"promo"}>
                <p>-15% avec le code promo CAFTHE41</p>
            </div>
            <Navbars />
        </>
    );
}

export default Header;