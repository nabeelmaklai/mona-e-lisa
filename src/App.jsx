import './App.css'
import Register from './pages/Register'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Nav from './components/Nav'
import User from './pages/User'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    
    setUser(null)
    localStorage.clear()
  }

  return (
    <div>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
        <Route path="/" element={<Home user={user} />} />

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<User user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
