import "./App.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Create_character from "./pages/Create_character";
import Home from "./pages/Home";
import Header from "./pages/header";
import Load_character from "./pages/load_character";
import { AuthProvider } from "./AuthContext";

import api from "./api";

const root = ReactDOM.createRoot(document.getElementById("root"));

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="load_character" element={<Load_character />} />
            <Route index element={<Home />} />
            <Route path="create_character" element={<Create_character />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

root.render(<App />);
