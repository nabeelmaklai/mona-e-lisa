import { Link } from 'react-router-dom'
const FollowingList = ({ following }) => {
  return following?.length ? (
    <div>
      {following?.map((user) => (
        <Link key={user._id} to={`/user/${user._id}`}>
          <h4>{user.name}</h4>
        </Link>
      ))}
    </div>
  ) : (<></>)
}

export default FollowingList
