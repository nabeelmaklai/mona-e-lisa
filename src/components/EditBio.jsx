import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Client from '../services/api'
const EditBio = ({ user, setChangedBio, handleSubmit }) => {
  const [editBioForm, setEditBioForm] = useState({
    name: '',
    bio: ''
  })
  let { id } = useParams()
  const onSubmit = async (event) => {
    event.preventDefault()
    await handleSubmit(editBioForm)
  }
  // useEffect(() => {
  //   handleSubmit()
  // }, [])

  const hadleChange = (event) => {
    setEditBioForm({ ...editBioForm, [event.target.name]: event.target.value })
    console.log(event.target.value)
  }

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
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
