import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./styles/reset.css"

import {AuthProvider} from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Layout from "./layout/Layout";

import Accueil from "./pages/Accueil";
import Shop from "./pages/Shop";
import Forum from "./pages/Forum";
import Panier from "./pages/Panier";
import Login from "./pages/Login";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Layout />}>
                            <Route index element={<Accueil />} />
                            <Route path={"shop"} element={<Shop />}/>
                            <Route path={"forum"} element={<Forum />}/>
                            <Route path={"card"} element={<Panier />}/>
                        </Route>
                        <Route path={"/login"} element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;