import { showArt } from '../services/Get'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Client from '../services/api'
const ShowArt = ({ user }) => {
  let { id } = useParams()
  const [art, setArt] = useState(null)
  const [commented, setCommented] = useState(false)
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

  return art ? (
    <div className="show-art">
      <h5>{art.userId.name}</h5>
      <h4>{art.name}</h4>
      <img src={art.img} alt="{art.userId.name}" />
      <p>{art.description}</p>
      <div className="comments-section">
        <input type="text" ref={commentRef.body} />
<<<<<<< HEAD
        <input type="hidden" hidden ref={commentRef.userId} value={user.id} />
=======
        <input
          type="hidden"
          hidden
          ref={commentRef.userId}

          value={user.id  }
        />
>>>>>>> 1ac7ee25b339e731a5f825aba59d5703a84e61a2
        <button onClick={addComment}>Comment</button>
        {art.commentIds.map((comment) => (
          <div  className="commentDiv" key={comment._id} >
          <b>{comment.userId.name }</b><br/>
           {comment.body} 
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default ShowArt
