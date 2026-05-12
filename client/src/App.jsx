import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import {ToastContainer} from "react-toastify"


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
