import axios from 'axios'
import React from 'react'
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleSubmit = async ()=>{
        
        const response = await axios.post("http://localhost:3001/register",{
            name,
            email,
            password,
        });

        console.log(response.data)

        navigate("/login")
    }
  return (
    <div>
        <input
        type="text"
        placeholder='Name'
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

        <input
        type="text"
        placeholder='Email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="text"
        placeholder='Password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>Register</button>
    </div>
  )
}

export default Register
