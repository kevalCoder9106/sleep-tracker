import { AuthContext } from "./AuthContext";
import { useState } from "react";

const AuthState = ({ children }) => {
    // host
    const host = "https://better-sleep.herokuapp.com/"

    const [isLoggedIn,setIsLoggedIn] = useState(false)

    // Signout 
    const signOut = () => {
        localStorage.setItem("TOKEN","")
        setIsLoggedIn(false)
    }
    
    // Login API Call
    const loginAPICall = ({ username, password }) => {
        // fetch data 
        const response = fetch(`${host}login`,{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ username: username, password: password })
        })
        .then(resp => resp.json())
        .then(result => {
                const { status, token } = result
            
                if (status === 'success'){
                    // storing token into localstorage
                    localStorage.setItem('TOKEN',token)
                    setIsLoggedIn(true)
                    
                    return 0
                }
                else{
                    setIsLoggedIn(false)
                    return status // returning error if not success
                }
            }
        )

        return response
        // if success then return 0; store token in localstorage; else return error;
    }

    // Register API Call
    const registerAPICall = ({ username, email, password }) => {
        // fetch data
        const response = fetch(`${host}register`,{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username: username, email: email, password: password})
        })
        .then(resp => resp.json())
        .then(result => {
            const { status, token } = result

            if (status === 'success'){
                // storing token into localstorage
                localStorage.setItem('TOKEN',token)
                setIsLoggedIn(true)

                return 0
            }
            else{
                setIsLoggedIn(false)

                return status
            }
        })

        return response

        // if success then return 0; store token in localstorge; else return error;
    }

    const sendOTP = ({ username, email }) => {
        const response = fetch(`${host}sendgmail`,{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username: username, email: email})
        })
        .then(resp => resp.json())
        .then(result => {
            const { status, otp } = result

            if (status === 'success'){
                return { status: 0, otp: otp }
            }
            else{
                return { status: status, otp: "" }
            }
        })

        return response
    }

    // verify api call
    const verifyAPICall = () => {
        const token = localStorage.getItem("TOKEN")

        const response = fetch(`${host}verify`,{
            method: "post",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ token: token })
        })
        .then(resp => resp.json())
        .then(result => {
            const { status } = result

            if (status === 'success'){
                setIsLoggedIn(true)
                return true
            }
            else{
                setIsLoggedIn(false)
                return false
            }
        })

        return response
    }

    

    const { Provider } = AuthContext

    return(
        <Provider value={{ isLoggedIn, loginAPICall, registerAPICall, sendOTP, verifyAPICall, signOut }}>
            {children}
        </Provider>
    )
}

export default AuthState