import { useState } from 'react'
const EditBio = () => {
  const [editArtForm, setEditArtForm] = useState({
    name: '',
    bio: ''
  })
  const handleAddCollection = () => {}
  const hadleChange = () => {}

  return (
    <div>
      <form action="" onSubmit={handleAddCollection}>
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
