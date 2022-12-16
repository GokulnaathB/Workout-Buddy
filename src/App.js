import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
// The BrowserRouter wraps everywhere we want to use the router basically.
// The Routes component wraps all of our individual routes.
// The Route component to create a single route.
// Navigate is for redirect.

// pages and components
import Home from './pages/Home'
import Login from "./pages/login"
import Signup from "./pages/Signup"
import Navbar from './components/Navbar'
import {useAuthContext} from "./hooks/useAuthContext"


function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      {/*  This surrounds everything that ever needs to use the routing system. */}
      <Navbar />
      <div className="pages">
        {/* All of our different pages are gonna go inside this div */}
        <Routes>
          <Route 
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />} //the element that we want to render "/" route.
          />
          <Route 
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" /> } 
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
