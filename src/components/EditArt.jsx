
const EditArt = ({hadleEditChange,hadleEditSubmit, setUpdate }) => {
  const handleAddCollection = () => {}
  const hadleChange = () => {}

  return (
    <div className="NameDescFormDiv">
      <form action="" onSubmit={hadleEditSubmit }>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={hadleEditChange} />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" onChange={hadleEditChange} />
        <button onClick={()=>{setUpdate(true)}} >Submit</button>
      </form>
    </div>
  )
}

export default EditArt
