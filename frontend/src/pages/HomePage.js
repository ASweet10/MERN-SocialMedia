import Navbar from 'components/Navbar'
import UserWidget from 'widgets/UserWidget'
import NewPostWidget from 'widgets/NewPostWidget'
import PostsWidget from 'widgets/PostsWidget'
import AdvertWidget from 'widgets/AdvertWidget'
import FriendsListWidget from 'widgets/FriendsListWidget'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@mui/material'

const HomePage = () => {
    const { _id, picturePath } = useSelector((state) => state.user)
    const largerThanMobile = useMediaQuery('(min-width:1000px)')
    return (
        <div>
            <Navbar />
            <div className="block md:flex w-full justify-center items-center bg-bg">
                <div className='flex m-6 p-6 md:p-2 md:m-2'>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </div>
                <div className='flex flex-col m-6 p-6 md:p-2 md:m-2'>
                    <NewPostWidget picturePath={picturePath} />
                {/* <PostsWidget userId={_id} /> */}
                    <PostsWidget userId={_id} />
                
                </div>
                {/* Friend's list; only shows on desktop */}
                {largerThanMobile && (
                    <div className='flex flex-col m-6 p-6 md:p-2 md:m-2'>
                        <AdvertWidget />
                        <FriendsListWidget userId={_id} />
                    </div>
                )}
            </div>
        </div>


    )
}

export default HomePage