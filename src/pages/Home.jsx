// import User from "./User"
import { GetArt } from "../services/Get"

import { useEffect, useState } from "react"

const Home = ({ user }) => {
  const [art, setArt] = useState([])
  const showArt = async () => {
    const response = await GetArt()
    console.log("this i sthe nhome function", response)
    setArt(response)
  }
  showArt()
  return user ? (
    <div>
      {art.map((art) => (
        <div>
        <h1>{art.userId.name}</h1>
        <img src={art.img} alt={art.name} />
        </div>

      ))}
    </div>
  ) : (
    <></>
  )
}
export default Home
