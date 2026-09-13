import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate = useNavigate();

    const handleLoginButton = async  ()=>{
        try {
            const response = await axios.post("http://localhost:3001/login",{
                email,
                password
            });

            localStorage.setItem("token", response.data.token)

            navigate("/")
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-semibold text-slate-800 mb-6">Login</h1>

            <input
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
            onClick={handleLoginButton}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium rounded-lg py-2 mb-4"
            >
                Login
            </button>

            <p className="text-slate-500 text-sm">Dont have a account</p>
            <button
            onClick={()=> navigate("/Register")}
            className="mt-2 w-full border border-slate-300 hover:bg-slate-100 transition-colors text-slate-700 font-medium rounded-lg py-2"
            >
                Register
            </button>
        </div>
    </div>
  )
}

export default Login