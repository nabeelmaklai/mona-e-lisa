import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { showCollection } from '../services/Get'
import Client from '../services/api'
import { Link } from 'react-router-dom'

const ShowCollection = ({ user }) => {
  let { id } = useParams()
  const [collection, setCollection] = useState({})
  const [collectionArt, setCollectionArt] = useState([])
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const getCollection = async () => {
      const response = await showCollection(id)
      setCollection(response)
      setCollectionArt(response.artIds)
      console.log('this is the response from show collection', response.artIds)
    }
    getCollection()
    setRemoved(false)
  }, [removed])

  const remove = async (artId) => {
    Client.put(`/collections/${id}/remove`, { artId })
    setRemoved(true)
  }

  return (
    <div className="show-collection">
      <h4>
        {collection.name}[{collection.description}]
      </h4>
      <p></p>

      {collectionArt.map((art) => (
        <div>
          <Link to={`/arts/${art._id}`}>
            <img
              className="ShowArtImg  img-resize resize"
              src={art.img}
              alt={art.name}
            />
          </Link>
          {collection.userId === user.id && (
            <button onClick={() => remove(art._id)}>Remove</button>
          )}
        </div>
      ))}
    </div>
  )
}

export default ShowCollection
