const EditArt = ({hadleEditChange,hadleEditSubmit }) => {
  const handleAddCollection = () => {}
  const hadleChange = () => {}

  return (
    <div>
      <form action="" onSubmit={hadleEditSubmit }>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={hadleEditChange} />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" onChange={hadleEditChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default EditArt
