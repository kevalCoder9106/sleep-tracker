import { DataContext } from "./DataContext";

const DataState = ({ children }) => {
    // host
    const host = "https://better-sleep.herokuapp.com/"

    // add sleep data
    const addSleepDataAPICall = ({ date, sleepHours }) => {
        const token = localStorage.getItem("TOKEN")

         const response = fetch(`${host}addsleepdata`,{
             method: 'post',
             headers: {'Content-Type':'application/json'},
             body: JSON.stringify({ token: token, date: date, sleepHours: sleepHours })
         })
         .then(resp => resp.json())
         .then(result => {
             const { status } = result

             if (status === 'success'){
                 return 0
             }
             else{
                 return status
             }
         })

         return response
    }

    // get sleep data
    const getSleepDataAPICall = () => {
        const token = localStorage.getItem("TOKEN")

        const response = fetch(`${host}getsleepdata`,{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ token: token })
        })
        .then(resp => resp.json() )
        .then(d_result => {
            const { status, result } = d_result
            
            if (status === 'success'){
                return { status: 'success', data: result }
            }
            else{
                return { status: status, data: "" }
            }
        })

        return response
    }

    // get average
    const getAverageAPICall = () => {
        const token = localStorage.getItem('TOKEN')

        const response = fetch(`${host}getaverage`,{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ token: token })
        })
        .then(resp => resp.json() )
        .then(d_result => {
            const { status, average } = d_result
            
            if (status === 'success'){
                return { status: 'success', average: average }
            }
            else{
                return { status: status, average: "" }
            }
        })

        return response
    }

    const { Provider } = DataContext

    return(
        <Provider value={{ addSleepDataAPICall, getSleepDataAPICall, getAverageAPICall }}>
            {children}
        </Provider>
    )
}

export default DataState