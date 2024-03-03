import Login from './Login'
import { ShowContent } from '../services/Get'
import { useState, useEffect } from 'react'
import { addArt } from '../services/Post'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AddArt from '../components/AddArt'

const User = ({ user }) => {
  let { id } = useParams()
  const [art, setArt] = useState([])
  const [addArtForm, setaddArtForm] = useState(false)
  const [newArt, setNewArt] = useState({
    name: '',
    description: '',
    img: '',
    userId: ''
  })
  let navigate = useNavigate()

  useEffect(() => {
    const getUserContent = async () => {
      const response = await ShowContent(id)
      console.log(response.artIds)
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
   
    await addArt({
      name: newArt.name,
      description: newArt.description,
      img: newArt.img,
      userId: user.id
    })
  }

  const handleAddArtButton = () => {
    addArtForm ? setaddArtForm(false) : setaddArtForm(true)
  }

  const navigateToAddCollection = () => {
    navigate('/collections')
  }

  return user ? (
    <div>
      <div>hello {user.userName}</div>
      <div>Email: {user.email}</div>
      <div>
        {art.artIds &&
          art.artIds.map((piece) => (
            <Link to={`/arts/${piece._id}`}>
              <img src={piece.img} alt={piece.name} key={piece._id} />
            </Link>
          ))}
        <button onClick={handleAddArtButton}>Add Art</button>

        <button onClick={navigateToAddCollection}>Create a Collection</button>

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
