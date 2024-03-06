import { showArt } from '../services/Get'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Client from '../services/api'
import AddToCollection from '../components/AddToCollection'
import LikeButton from '../components/LikeButton'
import EditArt from '../components/EditArt'
import CollectionsIcon from '@mui/icons-material/Collections';

import ReplySection from '../components/ReplySection'

const ShowArt = ({ user }) => {
  let { id } = useParams()
  const [art, setArt] = useState(null)
  const [commented, setCommented] = useState(false)
  const [showCollection, setShowCollection] = useState(false)
  const [deleteCommentId, setDeleteCommentId] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [editArt, setEditArt] = useState(false)
  const [replayed, setReplayed] = useState(false)
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
      setCommented(false)
      setDeleted(false)
      setReplayed(false)
    }
    getArt()
  }, [commented, editArt, replayed])

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

  const showReplies = (e) => {
    e.target.nextSibling.hidden
      ? (e.target.nextSibling.hidden = false)
      : (e.target.nextSibling.hidden = true)
  }

  return art ? (
    <div className="show-art">
      

      <h5>{art.userId.name}</h5>
      <h5>{art.userIds}</h5>

      <h4>{art.name}</h4>

      {user ? (
        art.userId._id === user.id && (
          <button onClick={handleEditClick}>Edit</button>
        )
      ) : (
        <></>
      )}
      {editArt && (
        <EditArt
          hadleEditChange={hadleEditChange}
          hadleEditSubmit={hadleEditSubmit}
        />
      )}

      <div className="ShowArtImgDiv" >      <img className="ShowArtImg img-resize"  src={art.img} alt={art.userId.name} />

      </div>
      <div>
      {user && <LikeButton user={user} art={art} />}</div>
      
      <div className="add-to-collection">
        {user && <CollectionsIcon onClick={showAddCollection}/> }

        {showCollection && <AddToCollection  user={user} artId={id} />}
      </div>
      {/* <p>hello{art.userId._id}</p> */}
      <p><b>{art.userId.name}</b> {art.description}</p>

      
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
            <div>
              <button onClick={showReplies}>Replies</button>
              <ReplySection
                comment={comment}
                user={user}
                setReplayed={setReplayed}
              />
            </div>
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
