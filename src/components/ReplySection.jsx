import { useRef } from 'react'
import Client from '../services/api'
import SendIcon from '@mui/icons-material/Send';
import { Avatar } from '@mui/material'

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
        <SendIcon onClick={reply}/>
      </div>
      {comment.replies.length ? (
        comment.replies.map((reply) => (
          <div key={reply._id}>
            <h5><Avatar style={{ width: '21px', height: '21px' }}  />{reply.user.name}:</h5>
            <p> {reply.body}</p>
          </div>
        ))
      ) : (
        <div>No Replies</div>
      )}
    </div>
  )
}

export default ReplySection
