// res
import moon from '../res/moon.png'
import sun from '../res/sun.png'

// Components
import Header from "../component/Header";

// Hooks
import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

// Context
import { AuthContext } from '../context/auth_context/AuthContext';
import { DataContext } from '../context/data_context/DataContext';

const Home = () => {
    // localstate
    const [error,updateError] = useState("")
    const [message,updateMessage] = useState("")
    const [sleepTime,setSleepTime] = useState(null)
    const [wakeupTime,setWakeupTime] = useState(null)

    const { verifyAPICall } = useContext(AuthContext)
    const { addSleepDataAPICall } = useContext(DataContext)

    const navigate = useNavigate()

    useEffect(() => {
        const verify = async () => {
            const isVerified = await verifyAPICall()

            if (isVerified === false){
                navigate('/login')
            }
        }

        verify()
    })

    const sleepTimeHandler = (e) => {
        updateError("")

        const hour = e.target.value.split(":")[0]
        setSleepTime(hour)
    }
    const wakeupTimeHandler = (e) => {
        updateError("")

        const hour = e.target.value.split(":")[0]
        setWakeupTime(hour)
    }

    const totalHoursHandler = (hours) => {
        updateMessage(`You took ${hours} hours of sleep today`)
    }

    const submitHandler = async () => {
        // if user has entered both values
        if (sleepTime !== null && wakeupTime !== null){
            console.log(sleepTime,wakeupTime)

            updateError("")

            const totalHours = sleepTime < wakeupTime ? (wakeupTime - sleepTime) : ((sleepTime - wakeupTime) - 24 < 0 ? ((sleepTime - wakeupTime) - 24) * -1 : (sleepTime - wakeupTime) - 24)

            // const totalHours = (sleepTime - wakeupTime) - 24 < 0 ? ((sleepTime - wakeupTime) - 24) * -1 : (sleepTime - wakeupTime) - 24
             var date = new Date().toString().split(" ")
            date = date[1] + "-" + date[2] + "-" + date[3]

            const response = await addSleepDataAPICall({ date: date, sleepHours: totalHours})
            
            if (response === 0){ // no error
                totalHoursHandler(totalHours)
            }
            else{
                updateError(response)
            }
        }
        else{
            updateError("Make sure you have entered sleep time and wakeup time")
        }
    }

    return(
        <div className="w-screen h-screen bg-main font-main home-container">
            <Header/>
            <div className='p-1 h-3/4 flex flex-row items-center justify-center'>
                <div className='w-1/2 flex flex-col items-center justify-center sleep-container'>
                    <div className='lg:text-2xl text-xs'>When did you sleep yesterday ?</div>
                    <input type='time' onChange={e => sleepTimeHandler(e)} className='m-3 bg-button rounded-md lg:p-2 p-1 shadow-md hover:shadow-none'></input> 
                    <div className='w-full flex justify-center'>
                        <img src={moon} alt='moon vector' className='w-[10rem]'></img>
                    </div>
                </div>
                <button onClick={submitHandler} className='p-3 lg:p-7 text-lg rounded-full button'>Ok.</button>
                <div className='w-1/2 flex flex-col items-center justify-center wakeup-container'>
                    <div className='lg:text-2xl text-xs'>When did you wake up today ?</div>
                    <input type='time' onChange={e => wakeupTimeHandler(e)} className='m-3 bg-button rounded-md lg:p-2 p-1 shadow-md hover:shadow-none'></input>
                    <div className='w-full flex justify-center'>
                        <img src={sun} alt='sun vector' className='w-[10rem]'></img>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center mt-5 text-red-700'>{error}</div>
            <div className='w-full flex justify-center mt-5 text-green-700'>{message}</div>
        </div>
    )
}

export default Home