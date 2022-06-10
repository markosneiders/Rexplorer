import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";
import LandingPage from "./routes/LandingPage/LandingPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="expenses" element={<Expenses />} />
			<Route path="invoices" element={<Invoices />} />
		</Routes>
	</BrowserRouter>
);
