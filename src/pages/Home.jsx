// import User from "./User"
import { GetArt } from "../services/Get"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const Home = ({ user }) => {
  const [art, setArt] = useState([])

  useEffect(() => {
    const showArt = async () => {
      const response = await GetArt()
      console.log("this i sthe nhome function", response)
      setArt(response)
    }
    showArt()
  }, [])

  return (
    <div className="grid-container">
      {art.map((art) => (
        <div>
          <h1>{art.userId.name}</h1>
          <Link to={`/arts/${art._id}`}>
           
            <img src={art.img} alt={art.name} />
          </Link>
        </div>
      ))}
    </div>)
  
  
}
export default Home
