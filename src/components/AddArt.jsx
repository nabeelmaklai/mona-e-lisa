import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
const AddArt = ({ hadleChange, handleAddArt }) => {
  return (
    <div>
      <form action="" onSubmit={handleAddArt}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={hadleChange} />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" onChange={hadleChange} />
        <label htmlFor="img">Image</label>
        <input type="text" name="img" onChange={hadleChange} />
        <button className="black">
          <LibraryAddCheckIcon style={{ color: 'white' }} />
        </button>
      </form>
    </div>
  )
}

export default AddArt
