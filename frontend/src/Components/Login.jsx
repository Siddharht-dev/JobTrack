import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate = useNavigate();

    const handleLoginButton = async  ()=>{
        const response = await axios.post("http://localhost:3001/login",{
            email,
            password
        });

        localStorage.setItem("token", response.data.token)

        navigate("/")
    }
  return (
    <div>
        <input
        type="text"
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <input
        type="text"
        placeholder='Password'
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        />

        <button onClick={handleLoginButton}>Login</button>
    </div>
  )
}

export default Login