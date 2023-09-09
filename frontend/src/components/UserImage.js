import React from 'react'

const UserImage = ({ image, size='60px' }) => {
  return (
    <div className='w-12 h-12'>
        <img 
            className='object-cover rounded-full w-12 h-12'
            alt='user'
            src={`http://localhost:3001/assets/${image}`}
        ></img>
    </div>
  )
}

export default UserImage