import Login from './Login'
import { ShowContent } from '../services/Get'
import { useState, useEffect } from 'react'
import { addArt } from '../services/Post'

const User = ({ user }) => {
  const [art, setArt] = useState([])
  const [newArt, setNewArt] = useState({
    name: '',
    description: '',
    img: ''
  })

  useEffect(() => {
    const getUserContent = async () => {
      const response = await ShowContent(user.id)
      console.log('This is the stuff response in Users', response)
      setArt(response)
    }
    getUserContent()
  }, [])

  const hadleChange = (event) => {
    setNewArt({ ...newArt, [event.target.name]: event.target.value })
  }

  const handleAddArt = async (event) => {
    event.preventDefault()
    await addArt({
      name: newArt.name,
      description: newArt.description,
      img: newArt.img
    })
  }

  return (
    <div>
      <div>hello {user.userName}</div>
      <div>Email: {user.email}</div>
      <div>
        
        <form action="" onSubmit={handleAddArt}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" onChange={hadleChange} />
          <label htmlFor="description">Description</label>
          <input type="text" name="description" onChange={hadleChange} />
          <label htmlFor="img">Image</label>
          <input type="text" name="img" onChange={hadleChange} />
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default User
