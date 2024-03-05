import { showArt } from '../services/Get'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Client from '../services/api'
import AddToCollection from '../components/AddToCollection'
import LikeButton from '../components/LikeButton'
import EditArt from '../components/EditArt'
const ShowArt = ({ user }) => {
  let { id } = useParams()
  const [art, setArt] = useState(null)
  const [commented, setCommented] = useState(false)
  const [showCollection, setShowCollection] = useState(false)
  const [deleteCommentId, setDeleteCommentId] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [editArt, setEditArt] = useState(false)
  const [editArtForm, setEditArtForm] = useState({
    name: '',
    description: ''
  })

  let commentRef = {
    body: useRef(null),
    artId: id,
    userId: useRef(null)
  }

  useEffect(() => {
    const getArt = async () => {
      const response = await showArt(id)
      setArt(response)
      console.log('This is the responce ID', response.userId._id)
      console.log('This is the responce ID1', user.id)

      setCommented(false)
      setDeleted(false)
    }
    getArt()
  }, [commented, editArt])

  const addComment = async () => {
    const comment = {
      body: commentRef.body.current.value,
      artId: id,
      userId: commentRef.userId.current.value
    }
    await Client.post(`/arts/${id}/comments`, comment)
    setCommented(true)

    commentRef.body.current.value = ''
    commentRef.userId.current.value = ''
  }

  const showAddCollection = () => {
    showCollection ? setShowCollection(false) : setShowCollection(true)
  }
  const handleDeleteClick = (event) => {
    setDeleteCommentId(event)
    console.log('this is the comment ID', event)
  }
  const handleDeleteComment = async (e) => {
    e.preventDefault()
    const commentToDelete = `/arts/${id}/comments/${deleteCommentId}`
    // console.log('This is the handleDeleteComment', commentToDelete)
    await Client.delete(commentToDelete)
    setDeleted(true)
    // setCommented(true)
  }

  const handleEditClick = () => {
    console.log('It works')
    editArt ? setEditArt(false) : setEditArt(!false)
    // navigate('/arts/edit')
  }
  const hadleEditChange = (event) => {
    setEditArtForm({ ...editArtForm, [event.target.name]: event.target.value })
    // console.log(event.target.value)
  }
  const hadleEditSubmit = async (e) => {
    e.preventDefault()
    await Client.put(`/arts/${id}`, editArtForm)

    // console.log('This is the handle submit button for the edits')
  }

  return art ? (
    <div className="show-art">
      <div className="add-to-collection">
        {user && <button onClick={showAddCollection}>ADD</button>}

        {showCollection && <AddToCollection user={user} artId={id} />}
      </div>

      <h5>{art.userId.name}</h5>
      <h5>{art.userIds}</h5>

      <h4>{art.name}</h4>

      {user ? (art.userId._id===user.id && (
        <button onClick={handleEditClick}>Edit</button>
      )) : (<></>)
}
        {editArt && (
          <EditArt
            hadleEditChange={hadleEditChange}
            hadleEditSubmit={hadleEditSubmit}
          />
        )}


      <img src={art.img} alt="{art.userId.name}" />
      {/* <p>hello{art.userId._id}</p> */}
      <p><b>{art.userId.name}</b> {art.description}</p>

      {user && <LikeButton user={user} art={art} />}
      <div className="comments-section">
        {user && (
          <div>
            {' '}
            <input type="text" ref={commentRef.body} />
            <input
              type="hidden"
              hidden
              ref={commentRef.userId}
              value={user.id}
            />
            <section>
              <button className="commentBtn" onClick={addComment}>
                Comment
              </button>
            </section>
          </div>
        )}

        {art.commentIds.map((comment) => (
          <div className="commentDiv" key={comment._id}>
            <b>{comment.userId.name}</b>
            <br />
            {comment.body}

            {user ? (
              comment.userId._id === user.id && (
                <form onSubmit={handleDeleteComment}>
                  <button
                    onClick={() => {
                      handleDeleteClick(comment._id)
                    }}
                  >
                    Delete
                  </button>
                </form>
              )
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default ShowArt
