import Client from '../services/api'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
const ShowArt = () => {
  let { id } = useParams()
  const [art, setArt] = useState()

  useEffect(() => {
    const getArt = async () => {
      const response = await Client.get(`arts/${id}`)
      setArt(response.data)
    }
    getArt()
  }, [])

  return (
    <div className="show-art">
      <h5>{art.userId.name}</h5>
      <h4>{art.name}</h4>
      <img src={art.img} alt={art.userId.name} />
      <p>{art.description}</p>
    </div>
  )
}

export default ShowArt
