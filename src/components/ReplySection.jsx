import { useRef } from 'react'
import Client from '../services/api'

const ReplySection = ({ comment, user, setReplayed }) => {
  let replyRef = useRef('')

  const reply = async () => {
    if (replyRef.current.value !== '') {
      const replyObj = {
        user: user.id,
        body: replyRef.current.value
      }
      await Client.put(`/comments/${comment._id}/reply`, replyObj)
      setReplayed(true)
      replyRef.current.value = ''
    }
  }

  return (
    <div hidden>
      <div className="replay-input">
        <input type="text" ref={replyRef} />
        <button onClick={reply}>Reply</button>
      </div>
      {comment.replies.length ? (
        comment.replies.map((reply) => (
          <div key={reply._id}>
            <h6>{reply.user.name}</h6>
            <p>{reply.body}</p>
          </div>
        ))
      ) : (
        <div>No Replies</div>
      )}
    </div>
  )
}

export default ReplySection
