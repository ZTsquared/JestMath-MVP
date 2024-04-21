import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Quiz from "./pages/Quiz";
import Store from "./pages/Store";
import Library from "./pages/Library";
import ParentPortal from "./pages/ParentPortal";
import NotFound404 from "./pages/NotFound404";
import AuthProvider from "./components/AuthProvider";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Welcome />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/quiz"
          element={
            <RequireAuth>
              <Quiz />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/store"
          element={
            <RequireAuth>
              <Store />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/library"
          element={
            <RequireAuth>
              <Library />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/parentPortal"
          element={
            <RequireAuth>
              <ParentPortal />
            </RequireAuth>
          }
        ></Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
