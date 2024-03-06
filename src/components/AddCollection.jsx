import { useState, useEffect } from 'react'
import { createCollection } from '../services/Post'
import { useNavigate } from 'react-router-dom'
const AddCollection = ({ user }) => {
  let navigate = useNavigate()
  const [addCollection, setAddCollection] = useState({
    name: '',
    description: '',
    userId: ''
  })
  const handleAddCollection = async (event) => {
    event.preventDefault()
    await createCollection({
      name: addCollection.name,
      description: addCollection.description,
      userId: user.id
    })
    navigate(`/user/${user.id}`)
  }

  const hadleChange = (event) => {
    setAddCollection({
      ...addCollection,
      [event.target.name]: event.target.value
    })
  }
  return (
    <div>
      <form action="" onSubmit={handleAddCollection}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={hadleChange} />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" onChange={hadleChange} />

        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddCollection
