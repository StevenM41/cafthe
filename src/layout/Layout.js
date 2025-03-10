import React from 'react';
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbars from "../components/Navbars";

function Layout() {
    return (
        <>
            <Header />
            <Navbars />
            {/*<Outlet />*/}
            <Footer />
        </>
    );
}

export default Layout;