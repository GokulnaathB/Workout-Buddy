//  Importing a function from the date-fns library.
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../hooks/useAuthContext"
import {apiUrl} from "../config"

 const WorkoutDetails = ({workout}) => {
    const {user} = useAuthContext()

    const handleClick = async  () => {
        if(!user) {
            return
        }
        const response = await fetch(`${apiUrl}/api/workouts/`+workout._id, {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${user.token}`}
        })
        // const json = await response.json()
        if(response.ok)
        window.location.reload()
    }

    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            {/* <p>{formatDistanceToNow(new Date(workout.createdAt, {addSuffix: true}))}</p> */}
            {/* It takes in as argument a date object. It takes a second argument, an options object.   */}
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
 }

 export default WorkoutDetails
