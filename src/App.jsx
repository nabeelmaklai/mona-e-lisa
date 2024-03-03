import './App.css'
import Register from './pages/Register'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Nav from './components/Nav'
import User from './pages/User'
import ShowArt from './pages/ShowArt'
import ShowCollection from './pages/ShowCollection'
import { useEffect, useState } from 'react'
import { CheckSession } from './services/Auth'
const App = () => {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    console.log(user)
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const checkTokenFunction = async () => {
        await checkToken()
      }
      checkTokenFunction()
    }
  }, [user])

  return (
    <div>
      <Nav />
      <main>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<User user={user} />} />
          <Route path="/arts/:id" element={<ShowArt />} />
          <Route path="/collections/:id" element={<ShowCollection />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
