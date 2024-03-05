import { ShowContent } from '../services/Get'
import { useState, useEffect } from 'react'
import { addArt } from '../services/Post'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AddArt from '../components/AddArt'
import FollowButton from '../components/FollowButton'
import { Avatar } from '@mui/material'
import ShowCollection from './ShowCollection'

const User = ({ user }) => {
  let { id } = useParams()
  const [art, setArt] = useState([])
  const [addArtForm, setaddArtForm] = useState(false)
  const [following, setFollowing] = useState(false)
  const [profile, setProfile] = useState({})
  const [collections, setCollections] = useState([])
  const [showCollection, setShowCollection] = useState(false)
  const [showArts, setShowArts] = useState(true)

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
      console.log(
        'this is the response from the get user content',
        response.collectionIds
      )
      setCollections(response.collectionIds)
      setProfile(response)
    }

    getUserContent()
  }, [id, following, showCollection])

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
  const handlecollectionButton = () => {

    setShowCollection(true)
    setShowArts(false)
  }
  const handleArtButton = () => {

    setShowArts(true)
    setShowCollection(false)
  }

  const navigateToAddCollection = () => {
    navigate('/collections')
  }
  {
    addArtForm && (
      <AddArt handleAddArt={handleAddArt} hadleChange={hadleChange} />
    )
  }

  return (
    <div>
      {user ? (
        user.id === id && (
          <button onClick={handlecollectionButton}>Collections</button>
        )
      ) : (
        <></>
      )}

      {user ? (
        user.id === id && <button onClick={handleArtButton}>Art</button>
      ) : (
        <></>
      )}

      {showCollection &&
        collections.map((collection) => (
          <Link to={`/collections/${collection._id}`} key={collection._id}>
            <img src={collection.artIds[0].img} alt={collection.name} />
            <p>Name:{collection.name}</p>
          </Link>
        ))}

      <div className="post__headerAuthor">
        <Avatar />
        <h2 className="h2">{profile.name}</h2>
      </div>

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
      <div>
        <div className="profileImgDiv">
          {art &&
            showArts &&
            art.map((piece) => (
              <Link key={piece._id} to={`/arts/${piece._id}`}>
                <img
                  className="HomeArtImgs ProfileImgs"
                  src={piece.img}
                  alt={piece.name}
                  key={piece._id}
                />
              </Link>
            ))}
        </div>

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
