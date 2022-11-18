import {useState} from "react"
import {useAuthContext} from "./useAuthContext"
import { apiUrl } from "../config"


export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`${apiUrl}/api/user/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    })
    const json = await response.json()
    if(!response.ok) {
        setIsLoading(false)
        setError(json.error)
    }
    if(response.ok) {

        // 1. We want to update the auth context with the user email that we get back.
        // 2. Update the loading state to be false again because we're finished.
        // 3. I want to take the jwt that we get back and I want to store that somewhere in the browser so that if the user closes the browser and opens the browser back up again and goes on to our website, they still have that jwt in the browser stored for that user so they're logged in still. And the way we're gonna do that is by saving it to local storage.

        // save the user to local storage and it's just gonna be the jwt and the email property
        localStorage.setItem("user", JSON.stringify(json)) // we have to store strings inside local storage


        // update the auth context
        // We need to dispatch now some kind of action
        dispatch({type: "LOGIN", payload: json})

        setIsLoading(false)
    }
    }

    return {signup, isLoading, error}    
}