// import "./App.css"
import { useNavigate } from 'react-router-dom'
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
import AddCollection from './components/AddCollection'
import EditArt from './components/EditArt'
import SideNav from './theme/SideNav'
import './theme/style-sheet/theme.css'
const App = () => {
  const [user, setUser] = useState(null)
  const [changedBio, setChangedBio] = useState(false)

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
  }, [changedBio])

  return (
    <div className="AppDiv">
      <SideNav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user/:id"
            element={
              <User
                user={user}
                checkToken={checkToken}
                set={setUser}
                changedBio={changedBio}
                setChangedBio={setChangedBio}
              />
            }
          />
          <Route path="/arts/:id" element={<ShowArt user={user} />} />
          <Route
            path="/collections/:id"
            element={<ShowCollection user={user} />}
          />
          {/* <Route path="/collections" element={<AddCollection user={user} />} /> */}
          <Route path="/arts/edit" element={<EditArt user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
