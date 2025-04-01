import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import "./styles/reset.css"

import {AuthProvider} from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Layout from "./layout/Layout";

import Accueil from "./pages/Accueil";
import Shop from "./pages/Shop";
import Forum from "./pages/Forum";
import Panier from "./pages/Panier";
import Login from "./pages/Login";
import Account from "./pages/Account";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <HashRouter>
                    <Routes>
                        <Route path={"/"} element={<Layout />}>
                            <Route index element={<Accueil />} />
                            <Route path={"shop"} element={<Shop />}/>
                            <Route path={"forum"} element={<Forum />}/>
                            <Route path={"card"} element={<Panier />}/>
                            <Route path={"account"} element={<Account />} />
                        </Route>
                        <Route path={"/login"} element={<Login />} />
                        <Route path={"/register"} element={<Register />} />
                    </Routes>
                </HashRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;