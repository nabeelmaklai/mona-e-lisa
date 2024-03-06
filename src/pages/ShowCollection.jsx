import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { showCollection } from '../services/Get'
import Client from '../services/api'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
const ShowCollection = ({ user }) => {
  let navigate = useNavigate()
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

  const deleteCollection = async () => {
    await Client.delete(`/collections/${id}`)
    navigate(`/user/${user.id}`)
  }

  return (
    <div className="show-collection">
      {collection.userId === user.id && (
        <button onClick={deleteCollection}>Delete Collection</button>
      )}
      <h4>
        {collection.name} {collection.description}
      </h4>
      <p></p>

      {collectionArt.map((art) => (
        <div class="collection-art">
          <Link to={`/arts/${art._id}`}>
            <img
              className="ShowArtImg  img-resize"
              src={art.img}
              alt={art.name}
            />
            {collection.userId === user.id && (
              <DeleteIcon onClick={() => remove(art._id)} />
            )}
          </Link>
          <br />
        </div>
      ))}
    </div>
  )
}

export default ShowCollection
