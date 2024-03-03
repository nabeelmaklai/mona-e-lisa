import './App.css'
import Register from './pages/Register'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Nav from './components/Nav'
import User from './pages/User'
import ShowArt from './pages/ShowArt'
import ShowCollection from './pages/ShowCollection'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import { CheckSession } from './services/Auth'
const App = () => {
  const [user, setUser] = useState(null)
  const handleLogOut = () => {
    
    setUser(null)
    localStorage.clear()
  }
  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)

  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const checkTokenFunction = async () => {
        await checkToken()
      }
      checkTokenFunction()
    }
  }, [])

  return (
    <div>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
        <Route path="/" element={<Home  user={user} />} />

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user/:id"
            element={<User user={user} checkToken={checkToken} />}
          />
          <Route path="/arts/:id" element={<ShowArt user={user} />} />
          <Route path="/collections/:id" element={<ShowCollection />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
