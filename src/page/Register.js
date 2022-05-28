// res
import login_vector from '../res/login_vector_2.png'

// hooks
import { useState, useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom'

// Context
import { AuthContext } from '../context/auth_context/AuthContext'

const Register = () => {
    const { registerAPICall, sendOTP } = useContext(AuthContext)
    
    const navigate = useNavigate()

    //#region local states
    const [hasPreRegistered,hasPreRegisteredHandler] = useState(false) // if user has entered creds, then show enter otp screen
    
    const [username, updateUsername] = useState("")
    const [email, updateEmail] = useState("")
    const [password, updatePassword] = useState("")

    const [otp, setOTP] = useState("")
    const [userOTP,setUserOTP] = useState("")
    
    const [error,updateError] = useState("")
    //#endregion

    const onRegisterHandler = async (e) => {
        e.preventDefault()

        // validate creds
        if (username === "" || email === "" || password === ""){
            updateError("Invalide user creds")
            return
        }

        // send otp
        const { status, otp } = await sendOTP({username:username,email:email})
        if (status === 0){ 
            // flush error
            updateError("")
            // set the otp to response otp
            setOTP(otp) 
            // hasPreRegistered to true
            hasPreRegisteredHandler(true)
        }
        else{
            // error sending otp
            updateError(status)
            hasPreRegisteredHandler(false)
        }

        e.target.reset()
    }

    const onPostRegisterHandler = async () => {
        // verify otp
        if (userOTP === otp){ 
            // flush error
            updateError("")
            // if verified then call register API
            const response = await registerAPICall({ username: username, email: email, password: password})

            if (response === 0){
                // successfully registered user
                navigate('/')
            }
            else{
                // if not registered
                updateError(response)
            }
        }
        else{
            // if entered wrong otp
            updateError("Incorrect OTP!")
        }

    }

    if (hasPreRegistered === false){ // register screen
        return(
            <div className="p-5 w-screen h-screen bg-main flex flex-col font-main">
                <div className='flex flex-row items-start justify-center'>
                    <div className=' lg:flex hidden w-[23rem]'>
                        <img src={login_vector} alt='login vector'></img>
                    </div>
                    <div className='p-5 flex flex-col items-center border border-gray-500 rounded-md'>
                        <div className='font-light text-xl md:text-4xl lg:text-5xl'>Better Sleep.</div>
                        <form id="register" onSubmit={onRegisterHandler} className='flex flex-col'>
                            <input id='username' type='text' placeholder='Username' onChange={e => updateUsername(e.target.value)} className='mt-9 input-box'></input>
                            <input type='email' placeholder='Email' onChange={e => updateEmail(e.target.value)} className='input-box'></input>
                            <input type='password' placeholder='Password' onChange={e => updatePassword(e.target.value)} className='input-box'></input>
                            <input type='submit' value='Register' className='button'/>
                        </form>
                        <div className='m-5 mt-7 w-full border border-gray-500'></div>
                        <div className='w-full flex items-start'>
                            <Link to='/login'>Login</Link>
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
    else{ // otp screen
        return(
            <div className="p-5 w-screen h-screen bg-main flex flex-col font-main">
                <div className='flex flex-row items-start justify-center'>
                    <div className=' lg:flex hidden w-[23rem]'>
                        <img src={login_vector} alt='login vector'></img>
                    </div>
                    <div className='p-5 flex flex-col items-center border border-gray-500 rounded-md'>
                        <div className='font-light text-xl md:text-4xl lg:text-5xl'>Better Sleep.</div>
                        <div className='flex flex-col'>
                            <input id='otp' type='otp' placeholder='OTP' onChange={e => setUserOTP(e.target.value)} className='mt-9 input-box'></input>
                            <button onClick={onPostRegisterHandler} className='button'>Verify</button>
                        </div>
                        <div className='m-5 mt-7 w-full border border-gray-500'></div>
                        <div className='w-full flex items-start'>
                            <Link to='/login'>Login</Link>
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
}

export default Register