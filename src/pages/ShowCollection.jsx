import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { showCollection } from '../services/Get'

const ShowCollection = () => {
  let { id } = useParams()
  const [collection, setCollection] = useState({})
  const [collectionArt, setCollectionArt] = useState([])

  useEffect(() => {
    const getCollection = async () => {
      const response = await showCollection(id)
      setCollection(response)
      setCollectionArt(response.artIds)
      console.log('this is the response from show collection', response.artIds)
    }
    getCollection()
  }, [])

  return (
    <div className="show-collection">
      <h4>{collection.name}</h4>
      <p>{collection.description}</p>

      {collectionArt.map((art) => (
        <img src={art.img} alt={art.name} />
      ))}
    </div>
  )
}

export default ShowCollection
