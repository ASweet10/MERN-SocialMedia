import { useEffect } from 'react'
import Friend from 'components/Friend'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from 'state/stateIndex'
import { useNavigate } from 'react-router-dom'
import { Divider } from "@mui/material"

const FriendsListWidget = ({ userId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`}
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  useEffect(() => {
    getFriends()
  }, [])

  return (
    <div className='p-4 mx-4 bg-white rounded-md my-3 text-secondary shadow-md shadow-secondary'>
      <p className='mb-3 font-bold text-secondary text-xl text-center'>Friends</p>

      <Divider sx={{ margin: "0.75rem 0"}} />

      <div className='flex flex-col gap-6'>
        {friends.map((friend) => (
          <Friend 
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            userPicturePath={friend.picturePath}
          />
        ))}
      </div>

    </div>
  )
}

export default FriendsListWidget