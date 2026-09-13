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
        <div>

            <input
            type="text"
            placeholder='Company'
            value={company}
            onChange={(e)=> setCompany(e.target.value)}
            />
            <input
            type="text"
            placeholder='title'
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            />
            <input
            type="text"
            placeholder='Location'
            value={location}
            onChange={(e)=> setLocaiton(e.target.value)}
            />
            <input
            type="text"
            placeholder='Salary'
            value={salary}
            onChange={(e)=> setSalary(e.target.value)}
            />
            <input
            type="text"
            placeholder='Status'
            value={status}
            onChange={(e)=> setStatus(e.target.value)}
            />

            <button onClick={addJobHandler}>Add job</button>
        </div>
    )
}


export default Addjob;