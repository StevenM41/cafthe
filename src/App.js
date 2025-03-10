import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layout/Layout";
import Accueil from "./pages/Accueil";
import React from "react";
import {AuthProvider} from "./context/AuthContext";

import Login from "./pages/Login";

import "../src/styles/reset.css"
import Shop from "./pages/Shop";

function App() {
    return (
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<Layout />}>
                      <Route index element={<Accueil />} />
                      <Route path={"shop"} element={<Shop />}/>
                  </Route>
                  <Route path={"/login"} element={<Login />} />
              </Routes>
          </BrowserRouter>
      </AuthProvider>
    );
}

export default App;