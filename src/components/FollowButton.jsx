import Client from '../services/api'

const FollowButton = ({ profile, user, setUser, following, setFollowing }) => {
  const follow = async () => {
    await Client.put(`/users/${user.id}/follow`, { userId: profile._id })

    setFollowing(true)
  }

  const unfollow = async () => {
    await Client.put(`/users/${user.id}/unfollow`, { userId: profile._id })
    setFollowing(false)
  }

  return following ? (
    <button onClick={unfollow} className="followBtn">
      Unfollow
    </button>
  ) : (
    <button onClick={follow} className="followBtn">
      Follow
    </button>
  )
}

export default FollowButton
