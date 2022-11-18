import { useEffect, useState } from "react"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import {useAuthContext} from "../hooks/useAuthContext"
import { apiUrl } from "../config"

const Home = () => {
    const [workouts, setWorkouts] = useState(null)
    const {user} = useAuthContext()

    // the useEffect hook fires a function when the component is rendered. We only want to fire it once, when it first is rendered. To achieve this, we pass in as a second argument an empty dependency array.
    useEffect(() => {
        console.log("Fetch")
        const fetchWorkouts = async () => {
            const response = await fetch(`${apiUrl}/api/workouts`, {
                headers: {"Authorization": `Bearer ${user.token}`},
            })
            const json = await response.json()
            if(response.ok) {
                setWorkouts(json)
            }
        }
        if(user) {
            fetchWorkouts() 
        }
    }, [user])
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home