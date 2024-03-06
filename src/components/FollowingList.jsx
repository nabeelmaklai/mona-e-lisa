import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Client from '../services/api'
const FollowingList = ({ user }) => {
  const [following, setFollowing] = useState([])

  useEffect(() => {
    if (user) {
      const getFollowing = async () => {
        const response = await Client.get(`/users/${user?.id}/following`)
        setFollowing(response.data)
        console.log('useEffect', following)
      }
      getFollowing()
    }
  }, [user])
  return following?.length ? (
    <div>
      {following?.map((user) => (
        <Link key={user._id} to={`/user/${user._id}`}>
          <h4>{user.name}</h4>
        </Link>
      ))}
    </div>
  ) : (
    <></>
  )
}

export default FollowingList
