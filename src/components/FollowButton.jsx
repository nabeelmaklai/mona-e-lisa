import { useEffect, useState } from 'react'
import Client from '../services/api'

const FollowButton = ({ user, profileId }) => {
  const [following, setFollowing] = useState(null)

  useEffect(() => {
    user.following.includes(profileId)
      ? setFollowing(true)
      : setFollowing(false)
  }, [following])

  const follow = async () => {
    await Client.put(`/users/${user.id}/follow`, { userId: profileId })
    user.following.push(profileId)
    setFollowing(true)
  }

  const unfollow = async () => {
    await Client.put(`/users/${user.id}/unfollow`, { userId: profileId })
    console.log('unfollow')
    const index = user.following.findIndex((id) => {
      return id === profileId
    })
    user.following.splice(index, 1)
    setFollowing(false)
  }

  return following ? (
    <button onClick={unfollow}>Unfollow</button>
  ) : (
    <button onClick={follow}>Follow</button>
  )
}

export default FollowButton
