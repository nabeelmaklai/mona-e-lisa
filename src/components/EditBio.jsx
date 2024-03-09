import { useState } from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
const EditBio = ({ handleSubmit, profile }) => {
  const [editBioForm, setEditBioForm] = useState({
    name: profile.name,
    bio: profile.bio
  })
  const onSubmit = async (event) => {
    event.preventDefault()
    await handleSubmit(editBioForm)
  }

  const hadleChange = (event) => {
    setEditBioForm({ ...editBioForm, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={hadleChange}
          value={editBioForm.name}
        />
        <label htmlFor="bio">Description</label>
        <input
          type="text"
          name="bio"
          onChange={hadleChange}
          value={editBioForm.bio}
        />
        <button className="black">
          <LibraryAddCheckIcon style={{ color: 'white' }} />
        </button>
      </form>
    </div>
  )
}
export default EditBio
