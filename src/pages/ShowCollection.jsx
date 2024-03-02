import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { showCollection } from '../services/Get'

const ShowCollection = () => {
  let { id } = useParams()
  const [collection, setCollection] = useState({})

  useEffect(() => {
    const getCollection = async () => {
      const response = await showCollection(id)
      setCollection(response)
    }
    getCollection()
  }, [])

  return (
    <div className="show-collection">
      <h5>{collection.userId.name}</h5>
      <h4>{collection.name}</h4>
      <p>{collection.description}</p>
      {collection.artIds.map((art) => (
        <img src={art.img} alt={art.name} />
      ))}
    </div>
  )
}

export default ShowCollection
