import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layout/Layout";
import Accueil from "./pages/Accueil";
import React from "react";
import {AuthProvider} from "./context/AuthContext";

import Login from "./pages/Login";

import "./styles/reset.css"
import Shop from "./pages/Shop";
import Forum from "./pages/Forum";
import Cart from "./pages/Cart";
import {CartContext} from "./context/CartContext";

function App() {
    return (
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<Layout />}>
                      <Route index element={<Accueil />} />
                      <Route path={"shop"} element={<Shop />}/>
                      <Route path={"forum"} element={<Forum />}/>
                      <Route path={"cart"} element={<Cart />}/>
                  </Route>
                  <Route path={"/login"} element={<Login />} />
              </Routes>
          </BrowserRouter>
      </AuthProvider>
    );
}

export default App;