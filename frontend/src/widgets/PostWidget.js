import Friend from 'components/Friend'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from 'state/stateIndex'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { BsChatDots, BsShareFill } from 'react-icons/bs'
import { Divider } from "@mui/material"

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [ isComments, setIsComments ] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggedInUserId = useSelector((state) => state.user._id)
  const isLiked = Boolean(likes[loggedInUserId]) // If current logged-in user has liked this post
  const likeCount = Object.keys(likes).length // Grab number of keys in "likes" array

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId })
    })
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }
  return (
    <div className='p-4 mx-2 bg-white rounded-md my-3 text-secondary shadow-md shadow-secondary'>

      <Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />
      <p className='mt-4'>{description}</p>
      {picturePath && ( <img alt="post" className='border-3 w-full h-auto overflow-hidden mt-3' src={`http://localhost:3001/assets/${picturePath}`} /> )}

      <div className='flex justify-between items-center mt-4'>
        <div className='flex justify-between items-center gap-4'>

          <div className='flex justify-between items-center gap-2 cursor-pointer'>
            <div onClick={patchLike}>
              {isLiked ? (<MdFavorite />) : (<MdFavoriteBorder />)}
            </div>
            <p>{likeCount}</p>
          </div>

          <div className='flex justify-between items-center gap-2 cursor-pointer'>
            <div onClick={() => setIsComments(!isComments)}>
              <BsChatDots />
            </div>
            <p>{comments.length}</p>
          </div>
        </div>

        <div className='pr-2 cursor-pointer'>
          <BsShareFill />
        </div>
      </div>
      {isComments && (
        <div className='mt-2'>
          {comments.map((comment, i) => (
            <div key={`${name}-${i}`}> {/* Add index to ensure key is unique */}
              <Divider sx={{ margin: "0.5rem 0"}} />
              <p className='pl-4'>{comment}</p>
            </div>
          ))}
          <Divider sx={{ margin: "0.5rem 0"}} />
        </div>
      )}
    </div>

  )
}

export default PostWidget