const AddCollection = ()=>{
return 
    <form action="" onSubmit={handleAddArt}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" onChange={hadleChange} />
          <label htmlFor="description">Description</label>
          <input type="text" name="description" onChange={hadleChange} />
          <label htmlFor="img">Image</label>
          <input type="text" name="img" onChange={hadleChange} />
          <button>Submit</button>
        </form> 
}

export default AddCollection