import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FriendsListWidget from 'widgets/FriendsListWidget'
import NewPostWidget from 'widgets/NewPostWidget'
import Navbar from 'components/Navbar'
import PostsWidget from 'widgets/PostsWidget'
import UserWidget from 'widgets/UserWidget'
import { useMediaQuery } from '@mui/material'

const ProfilePage = () => {
    const [ user, setUser ] = useState(null)
    const { userId } = useParams()
    const token = useSelector((state) => state.token)
    const largerThanMobile = useMediaQuery("(min-width: 1000px)")

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        setUser(data)
    }

    useEffect(() => {
        getUser()
    }, [])

    if(!user) return null

    return (
        <div className="flex w-full h-full text-black justify-center items-center bg-bg">
            <Navbar />
            <div className="block md:flex w-full h-screen justify-center items-center gap-8 bg-bg">
                <div className='flex md:basis-1/3 m-8 p-6 md:p-2 md:m-2'>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <FriendsListWidget userId={userId} />
                </div>
                <div className='flex flex-col md:basis-1/2 m-8 p-6 md:p-2 md:m-2'>
                    <NewPostWidget picturePath={user.picturePath} />
                    <PostsWidget userId={userId} isProfile />                
                </div>
            </div>
        </div>
    )

}

export default ProfilePage