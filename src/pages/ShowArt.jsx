import { showArt } from '../services/Get'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Client from '../services/api'
import AddToCollection from '../components/AddToCollection'
import LikeButton from '../components/LikeButton'
const ShowArt = ({ user }) => {
  let { id } = useParams()
  const [art, setArt] = useState(null)
  const [commented, setCommented] = useState(false)
  const [showCollection, setShowCollection] = useState(false)
  const [deleteCommentId, setDeleteCommentId] = useState(null)
  const [deleted, setDeleted] = useState(false)

  let commentRef = {
    body: useRef(null),
    artId: id,
    userId: useRef(null)
  }

  useEffect(() => {
    const getArt = async () => {
      const response = await showArt(id)
      setArt(response)
      // console.log(response._id)
      setCommented(false)
      setDeleted(false)
    }
    getArt()
  }, [commented])

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

  return art ? (
    <div className="show-art">
      <div className="add-to-collection">
        {user && <button onClick={showAddCollection}>ADD</button>}

        {showCollection && <AddToCollection user={user} artId={id} />}
      </div>
      <h5>{art.userId.name}</h5>
      <h5>This{art.userIds}hfsdklhfks</h5>

      <h4>{art.name}</h4>
      <img src={art.img} alt="{art.userId.name}" />
      <p>{art.description}</p>
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

            {/* <form onSubmit={handleDeleteComment}>
              <button
                onClick={() => {
                  handleDeleteClick(comment._id)
                }}
              >
                Delete
              </button> */}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default ShowArt
