import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

   useEffect(() => {
    const user =  JSON.parse(localStorage.getItem("user"))
    if(user) {
      dispatch({type: "LOGIN", payload: user})
    }
   }, []) // Empty dependency array means to only fire this useEffect function once when the component first renders and since we're only doing this once at the very start when the component first renders, when the react application essentially loads, what we're doing is doing that check for the tokrn in local local storage just once to try and find out if we have a value for it.

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}
