import { showArt } from '../services/Get'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
const ShowArt = () => {
  let { id } = useParams()
  const [art, setArt] = useState({})

  useEffect(() => {
    const getArt = async () => {
      const response = await showArt(id)
      console.log('response: ', response)
      setArt(response)
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
