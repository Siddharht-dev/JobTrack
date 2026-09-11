import { useState } from "react";
import axios from "axios";
function App() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleRegister = async ()=>{
  const response = await axios.post("http://localhost:3001/register",{
    name,
    email,
    password,
  });
  
  console.log(response.data);
}

  return (
    <div>
      <h1>JobTrack</h1>

      <h2>Register</h2>

      <input
       type="text"
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

      <input
       type="email"
       placeholder="Email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
        />

      <input
       type="password"
       placeholder="Password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       />

      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default App