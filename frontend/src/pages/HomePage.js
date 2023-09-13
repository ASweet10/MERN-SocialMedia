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
            <div className="block md:flex w-full justify-center bg-bg">
                
                <div className='flex basis-3/12 flex-col md:p-2 md:mt-8'>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </div>
                
                {/*}
                {largerThanMobile && (
                    <div className='flex basis-3/12 flex-col md:p-2 md:mt-8'>
                        <AdvertWidget />
                        <FriendsListWidget userId={_id} />
                    </div>
                )}
                */}
                <div className='flex basis-5/12 flex-col gap-4 p-6 md:p-2 md:mt-8'>
                    <NewPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />                
                </div>
                {/* Friend's list; only shows on desktop */}
                {largerThanMobile && (
                    <div className='flex basis-3/12 flex-col md:p-2 md:mt-8'>
                        <AdvertWidget />
                        <FriendsListWidget userId={_id} />
                    </div>
                )}
            </div>
        </div>


    )
}

export default HomePage