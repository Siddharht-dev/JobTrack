import axios from 'axios'
import React from 'react'
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleSubmit = async ()=>{
        try {
            const response = await axios.post("http://localhost:3001/register",{
                name,
                email,
                password,
            });

            console.log(response.data)

            navigate("/login")
        } catch (error) {
            console.error("Error registering:", error);
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-semibold text-slate-800 mb-6">Register</h1>

            <input
            type="text"
            placeholder='Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium rounded-lg py-2 mb-4"
            >
                Register
            </button>

            <p className="text-slate-500 text-sm">Already have a account?</p>
            <button
            onClick={()=>navigate("/Login")}
            className="mt-2 w-full border border-slate-300 hover:bg-slate-100 transition-colors text-slate-700 font-medium rounded-lg py-2"
            >
                Login
            </button>
        </div>
    </div>
  )
}

export default Register