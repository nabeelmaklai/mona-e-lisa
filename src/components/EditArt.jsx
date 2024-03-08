import { useState } from 'react'

const EditArt = ({ hadleEditChange, hadleEditSubmit, setUpdate, art }) => {
  const handleAddCollection = () => {}
  const hadleChange = () => {}

  return (
    <div className="NameDescFormDiv">
      <form action="" onSubmit={hadleEditSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={hadleEditChange}
          value={art.name}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          onChange={hadleEditChange}
          value={art.description}
        />
        <button
          onClick={() => {
            setUpdate(true)
          }}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default EditArt
