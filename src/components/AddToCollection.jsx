import Client from '../services/api'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useEffect, useState } from 'react'
const AddToCollection = ({ user, artId }) => {
  const [collections, setCollections] = useState([])
  const [added, setAdded] = useState(false)
  const [collection, setCollecton] = useState(null)
  useEffect(() => {
    const getCollection = async () => {
      const response = await Client.get(`/users/${user.id}/collections`)
      const newCollections = response.data.filter(
        (collection) => !collection.artIds.find((id) => id === artId)
      )
      setCollections(newCollections)
    }
    getCollection()
  }, [added])

  const add = async (event) => {
    await Client.put(`collections/${collection}/add`, {
      artId: artId
    })
    setAdded(true)
  }

  const selectCollection = (event) => {
    setCollecton(event.target.value)
  }
  return (
    <div>
      <select onChange={selectCollection} name="collections">
        <option value="" selected disabled>
          collections
        </option>
        {collections.map((collection) => (
          <option key={collection._id} value={collection._id}>
            {collection.name}
          </option>
        ))}
      </select>
      <PlaylistAddIcon onClick={add}/>
    </div>
  )
}

export default AddToCollection
