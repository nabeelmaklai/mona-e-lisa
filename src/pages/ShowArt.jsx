import { showArt } from '../services/Get'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Client from '../services/api'
import AddToCollection from '../components/AddToCollection'
import LikeButton from '../components/LikeButton'
import EditArt from '../components/EditArt'
import CollectionsIcon from '@mui/icons-material/Collections'
import SendIcon from '@mui/icons-material/Send'
import ReplySection from '../components/ReplySection'

import EditIcon from '@mui/icons-material/Edit'
import ReplyIcon from '@mui/icons-material/Reply'
import { Avatar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
const ShowArt = ({ user }) => {
  const [update, setUpdate] = useState(false)

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
      response?.commentIds.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setDeleted(true)

      setArt(response)
      setCommented(false)
      setDeleted(false)
      setReplayed(false)
      setUpdate(false)
      setEditArtForm({
        name: response.name,
        description: response.description
      })
    }

    getArt()
  }, [commented, editArt, replayed, update, deleted])

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
    setUpdate(true)

    // console.log('This is the handle submit button for the edits')
  }

  const showReplies = (e) => {
    e.target.nextSibling.hidden
      ? (e.target.nextSibling.hidden = false)
      : (e.target.nextSibling.hidden = true)
  }

  return art ? (
    <div className="show-art">
      {/* <h5>Name: {art.userId.name}</h5> */}

      {user ? (
        art.userId._id === user.id && (
          <div className="EditBtnDiv">
            <EditIcon onClick={handleEditClick} />{' '}
          </div>
        )
      ) : (
        <></>
      )}
      {editArt && (
        <EditArt
          hadleEditChange={hadleEditChange}
          hadleEditSubmit={hadleEditSubmit}
          setUpdate={setUpdate}
          art={editArtForm}
        />
      )}

      <div className="ShowArtImgDiv">
        <h4>Name: {art.name}</h4>
        <img
          className="ShowArtImg img-resize"
          src={art.img}
          alt={art.userId.name}
        />

        <div className="underTheImgArt">
          {user && <LikeButton user={user} art={art} />}

          {/* <div className="add-to-collection"> */}
          {user && <CollectionsIcon onClick={showAddCollection} />}

          {showCollection && <AddToCollection user={user} artId={id} />}
          {/* </div> */}
        </div>
        {/* <p>hello{art.userId._id}</p> */}
        <p>
          <b>{art.userId.name}</b> {art.description}
        </p>
      </div>
      <section className="body">
        {/* <div className="comments-section "> */}
        <div className="scroll-div">
          <div className="scroll-object">
            <div className="scroll-bg">
              {user && (
                <div className="commentsInput">
                  {' '}
                  <input type="text" ref={commentRef.body} />
                  <input
                    type="hidden"
                    hidden
                    ref={commentRef.userId}
                    value={user.id}
                  />{' '}
                  <SendIcon onClick={addComment} />
                </div>
              )}
              {art.commentIds.map((comment) => (
                <div className="commentDiv" key={comment._id}>
                  <div className="post__headerAuthor">
                    <Avatar style={{ width: '21px', height: '21px' }} />
                    <h4 className="h2">{comment.userId.name}</h4>:{' '}
                    {comment.body}
                  </div>

                  <div>
                    <ReplyIcon onClick={showReplies} />

                    <ReplySection
                      comment={comment}
                      user={user}
                      setReplayed={setReplayed}
                      id={id}
                    />
                  </div>
                  {user ? (
                    comment.userId._id === user.id && (
                      <form onSubmit={handleDeleteComment}>
                        <DeleteIcon
                          style={{ color: 'red' }}
                          onClick={() => {
                            handleDeleteClick(comment._id)
                          }}
                        />
                      </form>
                    )
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <></>
  )
}

export default ShowArt
