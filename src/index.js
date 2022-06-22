import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"

import LandingPage from "./routes/LandingPage/LandingPage"
import Mainpage from "./routes/Mainpage/MainPage"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <BrowserRouter>
        <Routes className="index">
            <Route path="/" element={<LandingPage />} />
            <Route path="MainPage" element={<Mainpage />} />
        </Routes>
    </BrowserRouter>
)
