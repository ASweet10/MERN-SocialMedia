import { MdAccountCircle, MdWorkOutline } from 'react-icons/md'
import { BiEdit, BiLocationPlus } from 'react-icons/bi'
import UserImage from 'components/UserImage'
import { useEffect, useState } from 'react'
import { Divider } from "@mui/material"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserWidget = ({ userId, picturePath }) => {
    const [ user, setUser ] = useState(null) //Grab user from backend & save for use
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`,
        {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        setUser(data)
    }

    // Called when component first rendered
    useEffect(() => {
        getUser()
    }, [])
    // Should have loading component while user waiting
    if(!user) {
        return null
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user

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
        {/*
    <div className='pt-8 px-10 mx-12 my-3 bg-white rounded-md text-secondary shadow-md shadow-secondary'>
        <div className='flex justify-between items-center'
            onClick={() => navigate(`/profile/${userId}`)}
        >
            <div className='flex justify-between items-center gap-4'>
                <UserImage image={picturePath} />
                <div>
                    <h3 className='text-textColor font-bold hover:cursor-pointer'>{firstName} {lastName}</h3>
                    <h3 className='text-textColor'>{friends.length} {friends.length == 1 ? 'friend' : 'friends' } </h3>
                </div>
            </div>

        </div>

        <Divider sx={{ margin: "0.75rem 0"}} />

        <div className='px-2'>
            <div className='flex items-center gap-4 mb-2'>
                <BiLocationPlus className='font-xl text-textColor' />
                <h3 className='text-textColor'>{location}</h3>
            </div>
            <div className='flex items-center gap-4'>
                <MdWorkOutline className='font-xl text-textColor' />
                <h3 className='text-textColor'>{occupation}</h3>
            </div>
        </div>

        <Divider sx={{ margin: "0.75rem 0"}} />

        <div>
            <div className='flex justify-between items-center'>
                <h3 className='text-sm text-textColor'>Profile Views</h3>
                <h3 className='text-sm text-textColor font-bold'>{viewedProfile}</h3>
            </div>
            <div className='flex justify-between items-center'>
                <h3 className='text-sm text-textColor'>Post Likes</h3>
                <h3 className='text-sm text-textColor font-bold'>{impressions}</h3>
            </div>
        </div>

        <Divider sx={{ margin: "0.75rem 0"}} />
        
        <div className='flex flex-row gap-2'>
            <div className='flex justify-between items-center cursor-pointer'>
                <img src='../assets/twitter.png' alt='twitter' />
            </div>
            <div className='flex justify-between items-center cursor-pointer'>
                <img src='../assets/linkedin.png' alt='linkedin' />
            </div>
            <div className='flex justify-between items-center cursor-pointer'>
                <img src='../assets/insta-logo.png' alt='instagram' />
            </div>
        </div>
    </div>
*/}
  )
}

export default UserWidget