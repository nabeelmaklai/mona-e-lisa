import { useEffect, useState } from 'react'
import Client from '../services/api'

const LikeButton = ({ user, art }) => {
  const [liked, setLiked] = useState(null)

  useEffect(() => {
    art.likes.includes(user.id) ? setLiked(true) : setLiked(false)
  }, [liked])

  const like = async () => {
    await Client.put(`/arts/${art._id}/like`, { userId: user.id })
    art.likes.push(user.id)
    setLiked(true)
  }

  const removeLike = async () => {
    await Client.put(`/arts/${art._id}/removelike`, { userId: user.id })
    const index = art.likes.findIndex((id) => {
      return id === user.id
    })
    art.likes.splice(index, 1)
    setLiked(false)
  }

  return liked ? (
    <button onClick={removeLike}>Liked {art.likes.length}</button>
  ) : (
    <button onClick={like}>Like {art.likes.length}</button>
  )
}

export default LikeButton
