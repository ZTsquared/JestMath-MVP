import { useState, useEffect } from 'react'
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
  useEffect(() => {console.log("the current user in App file is now "); console.log(currentUser)}, [currentUser])

  async function getUser (){
    try {
      // console.log("trying to refresh user for userName")
      // console.log(currentUser.userName + ` at path:  api/users/${currentUser.userName}` )
      const resultJSON = await fetch(`api/users/${currentUser.userName}`);
      const user = await resultJSON.json();
      setCurrentUser(user[0])
    }catch (err){
      console.log(err)
    }
  }


  function handleUserChange (selectedUser) {
    setCurrentUser(selectedUser)
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome currentUser = {currentUser} setCurrentUser = {(selectedUser) => handleUserChange(selectedUser)}/>}></Route>
        <Route path="/quiz" element={<Quiz currentUser = {currentUser} getUser = {getUser}/>}></Route>
        <Route path="/store" element={<Store currentUser = {currentUser} getUser = {getUser}/>}></Route>
        <Route path="/library" element={<Library currentUser = {currentUser} getUser = {getUser}/>}></Route>
      </Routes>
    </>
  )
}

export default App
