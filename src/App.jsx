import './App.css'
import Register from './pages/Register'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Nav from './components/Nav'
import User from './pages/User'
import { useEffect, useState } from 'react'
const App = () => {
  const [user, setUser] = useState(null)

  return (
    <div>
      <Nav />
      <main>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<User user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
