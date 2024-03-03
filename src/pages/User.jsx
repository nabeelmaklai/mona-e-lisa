import Login from './Login'
import { ShowContent } from '../services/Get'
import { useState, useEffect } from 'react'
import { addArt } from '../services/Post'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AddArt from '../components/AddArt'

const User = ({ user }) => {
  let { id } = useParams()

  const [art, setArt] = useState([])
  const [newArt, setNewArt] = useState({
    name: '',
    description: '',
    img: '',
    userId: ''
  })

  useEffect(() => {
    const getUserContent = async () => {
      const response = await ShowContent(id)
      setArt(response)
      console.log(response.artIds)
    }
    getUserContent()
  }, [])

  const hadleChange = (event) => {
    setNewArt({ ...newArt, [event.target.name]: event.target.value })
  }

  const handleAddArt = async (event) => {
    event.preventDefault()
    console.log('this is the add art console.log', user.id)
    await addArt({
      name: newArt.name,
      description: newArt.description,
      img: newArt.img,
      userId: user.id
    })
  }

  const handleAddArtButton = () => {
    setaddArtForm(true)
  }
  return user ? (
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
        {art.artIds.map((piece) => (
          <Link to={`/arts/${piece._id}`}>
            <img src={piece.img} alt={piece.name} key={piece._id} />
          </Link>
        ))}
        <button onClick={handleAddArtButton}>something</button>
        {addArtForm && (
          <AddArt handleAddArt={handleAddArt} hadleChange={hadleChange} />
        )}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default User
