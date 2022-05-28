import { useState, useContext } from 'react'

import RenderIf from './RenderIf'

import { Link } from 'react-router-dom'

// Context
import { AuthContext } from '../context/auth_context/AuthContext'

const Header = () => {
    // localstate
    const [showMenu,showMenuHandler] = useState(false)

    // getting signout 
    const { signOut } = useContext(AuthContext)

    const signOutHandler = () => {
        signOut()
        window.location.reload()
    }

    return(
        <div className="px-2 w-full flex flex-row items-center justify-between shadow-sm font-main font-light">
            <Link to='/' className='p-1 font-light text-xl md:text-3xl lg:text-4xl'>Better Sleep.</Link>
            <div onClick={() => showMenuHandler(!showMenu)} className="md:hidden block space-y-[6px]">
                <div className="w-6 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
            </div>
            <div className='w-1/4 md:flex flex-row items-center hidden'>
                <Link to='/graph' className='flex justify-center rounded text-lg p-1 hover:bg-blue-400 w-2/3'>Graph</Link>
                <button onClick={signOutHandler} className='flex justify-center rounded text-lg p-1 hover:bg-blue-400 w-2/3'>Sign Out</button>
            </div>
            <RenderIf show={showMenu}>
                <div className='md:hidden flex flex-col text-white justify-center items-start fixed top-9 left-0 w-full h-20 bg-black opacity-30'>
                    <Link to='/graph' className='flex items-start rounded text-lg p-1 hover:bg-slate-500 w-2/3'>Graph</Link>
                    <button onClick={signOutHandler} className='flex items-start rounded text-lg p-1 hover:bg-slate-500 w-2/3'>Sign Out</button>
                </div>
            </RenderIf>
        </div>
    )
}

export default Header