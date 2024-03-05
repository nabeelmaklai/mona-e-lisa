import { useEffect, useState } from 'react'
import Client from '../services/api'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
    <div>
      <FavoriteIcon onClick={removeLike} style={{ color: 'red' }} /> <span style={{ color: 'white' }}> {art.likes.length} </span>
    </div>
  ) : (
    <div>
    <FavoriteBorderIcon onClick={like}/> <span style={{ color: 'white' }}>{art.likes.length}</span>
     </div>
  )
}

export default LikeButton
