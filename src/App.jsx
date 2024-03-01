import "./App.css"
import Register from "./pages/Register"
import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Nav from "./components/Nav"
const App = () => {
  return (
    <div>
      <Nav/>
      <main>
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        
      </main>
    </div>
  )
}

export default App
