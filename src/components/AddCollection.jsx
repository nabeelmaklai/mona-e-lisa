import { useState, useEffect } from 'react'
import { createCollection } from '../services/Post'
import { useNavigate } from 'react-router-dom'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
const AddCollection = ({ user, setAddCollectionForm }) => {
  let navigate = useNavigate()
  const [addCollection, setAddCollection] = useState({
    name: '',
    description: '',
    userId: ''
  })
  const handleAddCollection = async (event) => {
    event.preventDefault()
    setAddCollectionForm(false)
    console.log('Done')
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
    console.log('handle change in the add collection componenet')
  }
  return (
    <div>
      <form action="" onSubmit={handleAddCollection}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={hadleChange} />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" onChange={hadleChange} />

        <button className="black">
          <LibraryAddCheckIcon style={{ color: 'white' }} />
        </button>
      </form>
    </div>
  )
}

export default AddCollection
