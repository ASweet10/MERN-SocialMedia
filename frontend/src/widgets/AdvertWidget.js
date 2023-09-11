import React from 'react'

const AdvertWidget = () => {
  return (
    <div className='p-6 mx-2 bg-white rounded-md my-3 text-secondary shadow-md shadow-secondary'>
      <div className='flex flex-col gap-2 justify-center items-center'>
        <p className='text-lg'>Sponsored</p>
      </div>
      <img className='w-full h-auto p-2' alt='advert' src="http://localhost:3001/assets/info4.jpeg"></img>
      <div className='flex flex-col justify-center items-center'>
        <p className='text-xl'>PSGCosmetics</p>
        <p className='text-sm cursor-pointer'>psgcosmetics.com</p>
      </div>
      <p className='text-xs cursor-pointer text-center pt-3'>[Click to buy ad space today!]</p>
    </div>
  )
}

export default AdvertWidget