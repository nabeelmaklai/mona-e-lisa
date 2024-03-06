import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
const EditBio = () => {
  const [editBioForm, setEditBioForm] = useState({
    name: '',
    bio: ''
  })
  let { id } = useParams()
  const handleSubmit = async () => {
    await Client.put(`/users/${id}`)
  }

  const hadleChange = (event) => {
    setEditBioForm({ ...editBioForm, [event.target.name]: event.target.value })
    console.log(event.target.value)
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={hadleChange} />
        <label htmlFor="bio">Description</label>
        <input type="text" name="bio" onChange={hadleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}
export default EditBio
