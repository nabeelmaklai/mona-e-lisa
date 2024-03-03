import Client from '../services/api'
import { useEffect, useState } from 'react'
const AddToCollection = ({ user, artId }) => {
  const [collections, setCollections] = useState([])
  const [added, setAdded] = useState(false)
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
    await Client.put(`collections/${event.target.value}/add`, {
      artId: artId
    })
    setAdded(true)
  }
  return (
    <div>
      <select name="collections">
        <option value="" selected disabled>
          collections
        </option>
        {collections.map((collection) => (
          <option key={collection._id} value={collection._id}>
            {collection.name}
          </option>
        ))}
      </select>
      <button onClick={add}>+</button>
    </div>
  )
}

export default AddToCollection
