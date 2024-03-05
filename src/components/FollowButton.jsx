import Client from '../services/api'

const FollowButton = ({ profile, user, following, setFollowing }) => {
  const follow = async () => {
    await Client.put(`/users/${user.id}/follow`, { userId: profile._id })
    setFollowing(true)
  }

  const unfollow = async () => {
    await Client.put(`/users/${user.id}/unfollow`, { userId: profile._id })
    setFollowing(false)
  }

  return following ? (
    <button onClick={unfollow}>Unfollow</button>
  ) : (
    <button onClick={follow}>Follow</button>
  )
}

export default FollowButton
