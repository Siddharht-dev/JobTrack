import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Addjob = () => {

    const navigate = useNavigate()
    const [company, setCompany] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [location, setLocaiton] = React.useState("")
    const [salary, setSalary] = React.useState("")
    const [status, setStatus] = React.useState("")


    const token = localStorage.getItem("token");

    useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }
}, []);

    const addJobHandler = async () => {
        try {
            const response = await axios.post("http://localhost:3001/jobs", {
                company,
                title,
                location,
                salary,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            navigate("/");
        } catch (error) {
            console.error("Error adding job:", error);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
                <h1 className="text-2xl font-semibold text-slate-800 mb-6">Add Job</h1>

                <input
                type="text"
                placeholder='Company'
                value={company}
                onChange={(e)=> setCompany(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                type="text"
                placeholder='title'
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                type="text"
                placeholder='Location'
                value={location}
                onChange={(e)=> setLocaiton(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                type="text"
                placeholder='Salary'
                value={salary}
                onChange={(e)=> setSalary(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                type="text"
                placeholder='Status'
                value={status}
                onChange={(e)=> setStatus(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                onClick={addJobHandler}
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium rounded-lg py-2"
                >
                    Add job
                </button>
            </div>
        </div>
    )
}


export default Addjob;