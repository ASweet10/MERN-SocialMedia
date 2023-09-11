import { useState } from 'react'
import { IconContext } from 'react-icons'
import { BiMessageDetail, BiSearch, BiHelpCircle } from 'react-icons/bi'
import { FaBars, FaTimes } from 'react-icons/fa'
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs'
import { IoIosNotifications } from 'react-icons/io'
import useColorMode from 'hooks/useColorMode'

import { useDispatch, useSelector } from 'react-redux'
import { setMode, setLogout } from '../state/stateIndex'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    const [ mobileMenuToggled, setMobileMenuToggled ] = useState(false)
    const [ searchQuery, setSearchQuery ] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    
    const fullName = `${user.firstName} ${user.lastName}`

    const handleLogout = () => {
        dispatch(setLogout())
        navigate('/home')
    }    

  return (
    <div className='flex w-full h-full items-center p-4 bg-white dark:bg-bg_dark'>
        {/* DESKTOP NAV */}
        <div className='hidden md:flex justify-between'>
            <div className='flex justify-between items-center gap-4'>
                <div className='flex justify-end items-center relative gap-4'>
                    <h2 className='font-bold text-3xl text-secondary hover:cursor-pointer' onClick={() => navigate("/")}>
                        Green Thumb
                    </h2>
                    <input onChange={(e) => setSearchQuery(e.target.value)} // (e) is value supplied by input
                        className='h-8 rounded-md p-2 outline-none border-none'
                        placeholder='Search...'
                        value={ searchQuery }
                        type="string" // Expects email, not string
                    />
                    <IconContext.Provider value={{color: 'gray', size: '10px'}}>
                        {/* width: placement within box; height: size of image */}
                        <BiSearch className='absolute w-1/6 h-5 cursor-pointer'/>
                    </IconContext.Provider>
                </div>

                <div className='flex flex-row gap-8'>
                    <BiMessageDetail size={30} className='cursor-pointer text-secondary' />
                    <IoIosNotifications size={30} className='cursor-pointer text-secondary' />
                    <BiHelpCircle size={30} className='cursor-pointer text-secondary' />
                    {/* Dark Mode here */}
                    <h3 className='font-bold capitalize text-lg text-secondary' value={ user ? fullName : '' }>{ user ? fullName : '' }</h3>
                    <h3 className='font-bold capitalize text-lg text-secondary cursor-pointer' 
                        onClick={() => handleLogout()}
                    >
                        { user ? 'Logout' : '' }
                    </h3>
                </div>
            </div>                
        </div>

        {/* MOBILE MENU BARS */}
        <div className='flex justify-between md:hidden'>
            <h2 className='font-bold text-3xl text-secondary hover:cursor-pointer' onClick={() => navigate("/")}>
                Green Thumb
            </h2>
            <div onClick={() => setMobileMenuToggled(!mobileMenuToggled)} className='cursor-pointer pl-8 z-10 md:hidden'>
                {mobileMenuToggled ? <FaTimes className='text-secondary dark:text-textColor' size={30}/> 
                    : <FaBars className='text-secondary dark:text-textColor' size={30}/> }
            </div>
        </div>

    </div>
  )
}

export default Navbar