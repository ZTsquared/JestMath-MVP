import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Link } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Quiz from "./pages/Quiz";
import Store from "./pages/Store";
import Library from "./pages/Library";

function App() {
  const [currentUser, setCurrentUser] = useState("")

  function handleUserChange (selectedUser) {
    setCurrentUser(selectedUser)
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome currentUser = {currentUser} setCurrentUser = {(selectedUser) => handleUserChange(selectedUser)}/>}></Route>
        <Route path="/quiz" element={<Quiz currentUser = {currentUser}/>}></Route>
        <Route path="/store" element={<Store currentUser = {currentUser}/>}></Route>
        <Route path="/library" element={<Library currentUser = {currentUser}/>}></Route>
      </Routes>
    </>
  )
}

export default App
