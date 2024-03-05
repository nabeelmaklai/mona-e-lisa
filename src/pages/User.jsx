import { ShowContent } from '../services/Get'
import { useState, useEffect } from 'react'
import { addArt } from '../services/Post'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AddArt from '../components/AddArt'
import FollowButton from '../components/FollowButton'
import { Avatar } from '@mui/material'

const User = ({ user }) => {
  let { id } = useParams()
  const [art, setArt] = useState([])
  const [addArtForm, setaddArtForm] = useState(false)
  const [following, setFollowing] = useState(false)
  const [profile, setProfile] = useState({})
  const [collection, setCollection] = useState([])

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
      const response1 = await ShowContent(user?.id)
      const newFollowingList = response1?.following.map((user) => user._id)
      newFollowingList.includes(id) ? setFollowing(true) : setFollowing(false)
      setArt(response.artIds)
      console.log('this is the response', response.collectionIds)
      setCollection(response.collectionIds)
      setProfile(response)
    }
    getUserContent()
  }, [id, following])

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

  return (
    <div>

      <div className="post__headerAuthor"><Avatar/><h2 className='h2'>{profile.name}</h2></div>

      <div>Email: {profile.email}</div>
      {user ? (
        user.id !== id && (
          <FollowButton
            user={user}
            profile={profile}
            following={following}
            setFollowing={setFollowing}
          />
        )
      ) : (
        <></>
      )}
      <div><div className='profileImgDiv'>
        {art &&
          art.map((piece) => (
            <Link key={piece._id} to={`/arts/${piece._id}`}>

              <img className="HomeArtImgs ProfileImgs" src={piece.img} alt={piece.name} key={piece._id} />
            </Link>
          ))}</div>
        {art &&
          collection.map((piece) => (
            <Link to={`/collections/${piece._id}`}>
              {/* <img src={piece.img} alt={piece.name} key={piece._id} /> */}
              <p>{piece.name}NAme:</p>
            </Link>
          ))}

        {user ? (
          user.id === id && (
            <button onClick={handleAddArtButton}>Add Art</button>
          )
        ) : (
          <></>
        )}
        {user ? (
          user.id === id && (
            <button onClick={navigateToAddCollection}>
              Create a Collection
            </button>
          )
        ) : (
          <></>
        )}

        {addArtForm && (
          <AddArt handleAddArt={handleAddArt} hadleChange={hadleChange} />
        )}
      </div>
    </div>
  )
}

export default User
