import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Client from '../services/api'
import { Avatar } from '@mui/material'
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
    <div className='Following'>
      <h1>{following.length} Following</h1>
      {following?.map((user) => (
        <Link key={user._id} to={`/user/${user._id}`}>
          <div className="post__headerAuthor">
          <Avatar />
          <h4 className="h2">{user.name}</h4>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <></>
  )
}

export default FollowingList
