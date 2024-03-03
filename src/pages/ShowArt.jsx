import { showArt } from '../services/Get'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Client from '../services/api'
const ShowArt = ({ user }) => {
  let { id } = useParams()
  const [art, setArt] = useState(null)
  const commentRef = {
    body: useRef(null),
    artId: id,
    userId: user.id
  }

  useEffect(() => {
    const getArt = async () => {
      const response = await showArt(id)
      setArt(response)
    }
    getArt()
  }, [])

  const addComment = async () => {
    await Client.post(`/arts/${id}/comments`, commentRef)
  }

  return art ? (
    <div className="show-art">
      {/* <h5>{art.userId.name}</h5> */}
      <h4>{art.name}</h4>
      <img src={art.img} alt="{art.userId.name}" />
      <p>{art.description}</p>
      <div className="comments-section">
        <input type="text" ref={commentRef.body} />
        <button onClick={addComment}>Comment</button>
        {art.commentIds.map((comment) => (
          <div>{comment.body}</div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default ShowArt
