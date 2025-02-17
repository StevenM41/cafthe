import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import React from "react";
import {AuthProvider} from "./context/AuthContext";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";

import "../src/styles/reset.css"

function App() {
    return (
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="produit/:id" element={<ProductDetails />} />
                  </Route>
                  <Route path={"login"} element={<Login />} />
              </Routes>
          </BrowserRouter>
      </AuthProvider>
    );
}

export default App;