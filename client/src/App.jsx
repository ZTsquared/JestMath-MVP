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
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome/>}></Route>
        <Route path="/quiz" element={<Quiz/>}></Route>
        <Route path="/store" element={<Store/>}></Route>
        <Route path="/library" element={<Library/>}></Route>
      </Routes>
    </>
  )
}

export default App
