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
    <div className='flex w-full h-full justify-center items-center p-4 bg-white dark:bg-bg_dark'>
        <div className='flex justify-center items-center gap-7'>
            <h2 className='font-bold text-3xl text-secondary hover:cursor-pointer'
                onClick={() => navigate("/")}
            >
                Green Thumb
            </h2>

            {/* DESKTOP NAV */}
            <div className='hidden md:flex'>
                <div className='flex justify-center items-center gap-8'>
                    <div className='flex justify-end items-center relative'>

                        <input onChange={(e) => setSearchQuery(e.target.value)} // (e) is value supplied by input
                            className='h-8 rounded-md p-2 outline-none border-none'
                            placeholder='Search...'
                            value={ searchQuery }
                            type="string" // Expects email, not string
                        />
                        <IconContext.Provider value={{color: 'gray', size: '10px'}}>
                            {/* width: placement within box; height: size of image */}
                            <BiSearch className='absolute w-1/5 h-5 cursor-pointer'/>
                        </IconContext.Provider>
                    </div>
                    {/* Dark Mode here */}
                    <BiMessageDetail size={30} className='cursor-pointer text-secondary' />
                    <IoIosNotifications size={30} className='cursor-pointer text-secondary' />
                    <BiHelpCircle size={30} className='cursor-pointer text-secondary' />
                    <h3 className='font-bold capitalize text-lg text-secondary' value={ user ? fullName : '' }>{ user ? fullName : '' }</h3>
                    <h3 className='font-bold capitalize text-lg text-secondary cursor-pointer' 
                        onClick={() => handleLogout()}
                    >
                        { user ? 'Logout' : '' }
                    </h3>
                </div>                
            </div>

            {/* MOBILE MENU BARS */}
            <div onClick={() => setMobileMenuToggled(!mobileMenuToggled)} className='cursor-pointer pl-4 z-10 md:hidden'>
                {mobileMenuToggled ? <FaTimes className='text-secondary dark:text-textColor' size={30}/> 
                    : <FaBars className='text-secondary dark:text-textColor' size={30}/> }
            </div>
        </div>
    </div>
  )
}

export default Navbar