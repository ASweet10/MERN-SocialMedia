import { BsPersonFillAdd, BsPersonFillDash } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from 'state/stateIndex'
import UserImage from './UserImage'
import { useNavigate } from 'react-router-dom'

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends) 
  
  const isFriend = friends.find((friend) => friend._id === friendId)
  
  const patchFriend = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()
    dispatch(setFriends({ friends: data })) 
  }
  return (
    <div className='flex justify-between items-center'>
      
      <div className='flex justify-between items-center gap-4'>
        <UserImage image={ userPicturePath } size="55px" />
        <div onClick={() => {
          navigate(`/profile/${friendId}`)
          navigate(0) // Navigate to friend's page after so components re-render
        }}>
          <p className='font-bold hover:cursor-pointer'>{name}</p>
          <p className='text-sm'>{subtitle}</p>
        </div>
      </div>

      <div onClick={() => patchFriend()} className='pr-2 cursor-pointer'>
        {isFriend ? (<BsPersonFillDash className='text-lg' />) : (<BsPersonFillAdd className='text-lg'/>)}
      </div>

    </div>
  )
}

export default Friend