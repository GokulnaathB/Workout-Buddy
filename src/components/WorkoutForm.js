import { useState } from "react"
import { apiUrl } from "../config"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const [emptyFileds, setEmptyFields] = useState([])
    const {user} = useAuthContext()

    const handleSubmit = async (e) => // async because we're going to reach out to the api
    {
        // preventing the default action of the form being submitted, which is that it'll get submitted to the endpoint mentioned in the action attribute, otherwise it gets submitted to our server itself, which means we lose the data. In either of the case, the page gets refreshed.
        e.preventDefault()

        if(!user) {
            setError("You must be logged in")
            return
        }

        // create some kind of dummy workout object that we're going to send as the body of the request.
        const workout = {title, load, reps}

        // Using the fetch api to send a post request.
        const response = await fetch(`${apiUrl}/api/workouts`, {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            setEmptyFields([])
            console.log("new workout added: ", json)
            window.location.reload();
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title} // So, if title changes from outside of the form, then that change is going to be reflected in the input as well. 
            className={emptyFileds.includes("title") ? "error" : ""}
            />

            <label>Load (in Kg): </label>
            <input 
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load} 
            className={emptyFileds.includes("load") ? "error" : ""}
            />

            <label>Number of Reps: </label>
            <input 
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFileds.includes("reps") ? "error" : ""}
             />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm
