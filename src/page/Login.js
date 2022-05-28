// res
import login_vector from '../res/login_vector_2.png'

// Contexts
import { AuthContext } from '../context/auth_context/AuthContext'

// Hooks
import { useContext, useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const { loginAPICall } = useContext(AuthContext)
    const navigate = useNavigate()

    // Local states
    const [username,updateUsername] = useState("")
    const [password,updatePassword] = useState("")
    
    const [error, updateError] = useState("")

    const onLoginHandler = async () => {
        // validate creds
        if (username === "" || password === ""){
            updateError("Invalide user creds")
            return
        }

        // calling login api
        const result = await loginAPICall({username: username, password: password})
        
        if (result !== 0) { // there is some error
            updateError(result)
        }
        else{
            updateError("")
            navigate('/') // navigating to home page
        }
    } 

    return(
            <div className="p-5 w-screen h-screen bg-main flex flex-col font-main">
                <div className='flex flex-row items-start justify-center'>
                    <div className=' lg:flex hidden w-[23rem]'>
                        <img src={login_vector} alt='login vector'></img>
                    </div>
                    <div className='p-5 flex flex-col items-center border border-gray-500 rounded-md'>
                        <div className='font-light text-xl md:text-4xl lg:text-5xl'>Better Sleep.</div>
                        <div className='flex flex-col'>
                            <input type='text' placeholder='Username' onChange={e => updateUsername(e.target.value)} className='mt-9 input-box'></input>
                            <input type='password' placeholder='Password' onChange={e => updatePassword(e.target.value)} className='input-box'></input>
                            <button className='button' onClick={(e) => onLoginHandler(e)}>Login</button>
                        </div>
                        <div className='m-5 mt-7 w-full border border-gray-500'></div>
                        <div className='w-full flex items-start'>
                            <Link to='/register'>Register</Link>
                        </div>
                        <div className='mt-5 text-red-700'>{error}</div>
                    </div>
                </div>

                <div className='mt-24 flex flex-col items-center'>
                    <div className='md:text-2xl text-sm'>“I don’t feel old. I don’t feel anything till noon. That’s when it’s time for my nap.”</div>
                    <div className='md:text-lg text-sm'>— Bob Hope</div>
                </div>
            </div>
    )
}

export default Login