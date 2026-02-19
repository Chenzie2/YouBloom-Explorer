import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/main"
          element={isLoggedIn ? <MainPage /> : <Navigate to="/" />}
        />
        <Route
          path="/detail/:id"
          element={isLoggedIn ? <DetailPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;