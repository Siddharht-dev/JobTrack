import Addjob from "./Components/Addjob";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from './Components/Register'
import Login from './Components/Login';
import Dashboard from "./Components/Dashboard"
import { Editjob } from "./Components/Editjob";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-job" element={<Addjob/>} />
          <Route path="/edit-job/:id" element={<Editjob />} />
        </Routes>
      </BrowserRouter>

    </div>

  )
}

export default App;
