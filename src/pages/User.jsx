import { ShowContent } from '../services/Get'
import { useState, useEffect, useRef } from 'react'
import { addArt } from '../services/Post'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AddArt from '../components/AddArt'
import FollowButton from '../components/FollowButton'
import { Avatar } from '@mui/material'
import ShowCollection from './ShowCollection'
import AddCollection from '../components/AddCollection'
import EditBio from '../components/EditBio'
import Client from '../services/api'
import EditIcon from '@mui/icons-material/Edit'
import CollectionsIcon from '@mui/icons-material/Collections'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

const User = ({ user, setUser, changedBio, setChangedBio }) => {
  let { id } = useParams()
  const [art, setArt] = useState([])
  const [addArtForm, setaddArtForm] = useState(false)
  const [addCollectionForm, setAddCollectionForm] = useState(false)
  const [following, setFollowing] = useState(false)
  const [profile, setProfile] = useState({})
  const [collections, setCollections] = useState([])
  const [showCollection, setShowCollection] = useState(false)
  const [showArts, setShowArts] = useState(true)
  const [editBioForm, setEditBioForm] = useState(false)
  const [updateProfile, setUpdateProfile] = useState(false)

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
      console.log(response)
      console.log(response1)
      const newFollowingList = response1?.following.map((user) => user._id)
      newFollowingList.includes(id) ? setFollowing(true) : setFollowing(false)
      response.artIds.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setArt(response.artIds)
      console.log(
        'this is the response from the get user content',
        response.bio
      )
      setCollections(response.collectionIds)
      setProfile(response)
    }

    getUserContent()
  }, [id, user, following, showCollection, changedBio, updateProfile])

  const handleSubmit = async (editBioForm) => {
    try {
      await Client.put(`/users/${id}`, editBioForm)
      setEditBioForm(false)
    } catch (error) {
      console.log('submit error')
    }
    setUpdateProfile((prev) => !prev)
  }
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
    addArtForm
      ? setaddArtForm(false)
      : (setaddArtForm(true), setAddCollectionForm(false))
  }
  const handleAddCollectionButton = () => {
    addCollectionForm
      ? setAddCollectionForm(false)
      : (setAddCollectionForm(true), setaddArtForm(false))
  }
  const handlEditBioForm = () => {
    editBioForm ? setEditBioForm(false) : setEditBioForm(true)
  }

  const handlecollectionButton = (e) => {
    setShowCollection(true)
    setShowArts(false)
  }
  const handleArtButton = (e) => {
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
    <div className="profile">
      <div className="post__headerAuthor">
        <Avatar />
        <h2 className="h2">{profile.name}</h2>
      </div>

      <div>Email: {profile.email}</div>
      <br />
      <div className="bioDiv">
        Bio: {profile.bio}
        {user ? (
          user.id === id && <EditIcon onClick={handlEditBioForm} />
        ) : (
          <></>
        )}
      </div>

      {editBioForm && (
        <EditBio
          profile={profile}
          user={user}
          handleSubmit={handleSubmit}
          setChangedBio={setChangedBio}
        />
      )}

      {user ? (
        user.id !== id && (
          <FollowButton
            user={user}
            setUser={setUser}
            profile={profile}
            following={following}
            setFollowing={setFollowing}
          />
        )
      ) : (
        <></>
      )}
      <div className="contentDiv">
        <div className="switchButtons">
          <button onClick={handleArtButton} className="switchButton">
            Art
          </button>
          <button onClick={handlecollectionButton} className="switchButton">
            Collections
          </button>
        </div>

        <div className="createButtons">
          {user ? (
            user.id === id && (
              <AddPhotoAlternateIcon onClick={handleAddArtButton} />
            )
          ) : (
            <></>
          )}
          {user ? (
            user.id === id && (
              <CollectionsIcon onClick={handleAddCollectionButton} />
            )
          ) : (
            <></>
          )}
        </div>

        {addArtForm && (
          <AddArt handleAddArt={handleAddArt} hadleChange={hadleChange} />
        )}
        {addCollectionForm && (
          <AddCollection
            user={user}
            setAddCollectionForm={setAddCollectionForm}
          />
        )}

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

          {showCollection &&
            collections.map((collection) => (
              <Link to={`/collections/${collection._id}`} key={collection._id}>
                {collection.artIds.length ? (
                  <img
                    className="ShowArtImg  img-resize resize"
                    src={collection.artIds[0].img}
                    alt={collection.name}
                  />
                ) : (
                  <></>
                )}
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
//
export default User

{
  /* <button onClick={handlEditBioForm}>Edit Your Bio</button> */
}
//
