// import User from "./User"
import { GetArt } from "../services/Get"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CheckSession } from "../services/Auth"

import { Avatar } from "@mui/material"
import SideNav from "../theme/SideNav"
import Sugesstions from "../theme/Sugesstions"
import Login from "./Login"
import Register from "./Register"
import FollowingList from "../components/FollowingList"
const Home = () => {
  const [art, setArt] = useState([])

  useEffect(() => {
    const showArt = async () => {
      const response = await GetArt()
      console.log("this i sthe nhome function", response)
      setArt(response)
    }
    showArt()
  }, [])

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
    const token = localStorage.getItem("token")
    if (token) {
      const checkTokenFunction = async () => {
        await checkToken()
      }
      checkTokenFunction()
    }
  }, [])

  return (
    <div className="homepage">
      
      <div className="PostFlexDiv">
        {art.map((art) => (
          <div className="post" key={art._id}>
            <Link to={`/user/${art.userId._id}`}>
              <div className="post__header">
                <div className="post__headerAuthor">
                
                  <Avatar />
                  <h2 className="h2">{art.userId.name}</h2>
                </div>
              </div>
            </Link>
            <Link to={`/arts/${art._id}`}>
              <div className="post__image">
                <img className="HomeArtImgs" src={art.img} alt={art.name} />
                
              </div>
            </Link>
            <p><b>{art.userId.name}</b> {art.description}</p>
          </div>
        ))}
      </div>
      <div className="homepage__timeline">
        <Sugesstions />
        {/* <FollowingList/> */}
        {/* <Login setUser={setUser} /> */}
      </div>
    </div>
  )
}
export default Home
