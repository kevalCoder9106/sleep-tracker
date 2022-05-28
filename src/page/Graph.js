import Header from "../component/Header"

// Hooks
import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

// Context
import { AuthContext } from '../context/auth_context/AuthContext';
import { DataContext } from "../context/data_context/DataContext";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const graphOptions = {
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: 'Your sleep graph',
        },
    },
}

const Graph = () => {
    // local states
    const [dates,setDates] = useState([])
    const [sleepHours,setSleepHours] = useState([])
    const [average,setAverage] = useState(null)
    const [error,updateError] = useState("")

    const { verifyAPICall } = useContext(AuthContext)
    const { getSleepDataAPICall, getAverageAPICall } = useContext(DataContext)

    const navigate = useNavigate()

    useEffect(() => {
        const verify = async () => {
            const isVerified = await verifyAPICall()
            
            if (isVerified === false){
                navigate('/login')
            }
        }

        verify()
        getGraphData()
        getAverage()
    })

    const getGraphData = async () => {
        const { status, data } = await getSleepDataAPICall()

        if (status === 'success'){
            const a_dates = []
            const a_hours = []

            data.map(d => {
                a_dates.push(d.date)
                a_hours.push(d.sleepHours)

                return 0
            })

            if (dates.length === 0){
                setDates(a_dates)
                setSleepHours(a_hours)
            }
        }
        else{
            updateError(status)
        }
    }

    const getAverage = async () => {
        const { status, average } = await getAverageAPICall()

        if (status === 'success'){
            if (average !== null){
                setAverage(average)
            }
        }
        else{
            updateError(status)
        }
    } 

    const data = {
        labels: dates,
        datasets: [{
            label: 'Hours',
            data: sleepHours,
            backgroundColor: 'rgba(189, 252, 237, 0.5)',
        }],
    }

    return(
        <div className="w-screen h-screen bg-main font-main font-light">
            <Header/>
            <div className="flex flex-col items-center justify-center">
                
                <div className="lg:w-1/2 w-3/4">
                    <Bar options={graphOptions} data={data}/>
                </div>

                <div className="w-full mt-9 flex justify-center items-center lg:text-3xl text-lg">
                    Your average sleep ration is {average} hours...
                </div>
                <div className='mt-42 w-full flex justify-center mt-5 text-red-700'>{error}</div>
            </div>
        </div>
    )
}

export default Graph