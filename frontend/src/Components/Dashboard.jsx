//This componnet's work is to send JWT from local storage to the backend, and also show jobs according to the user
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();

    const [jobs, setJobs] = React.useState([]);

    useEffect(() => {
        handleGetJobs();
        console.log("Dashboard opened")

    }, [])

    const handleGetJobs = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/jobs", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        setJobs(response.data);
        console.log(response.data);

    }
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={()=>navigate("/add-job")}>Add Job</button>
            {jobs.map((job) => (
                <div key={job._id}>
                    <h3>{job.company}</h3>
                    <p>{job.title}</p>
                    <p>{job.location}</p>
                    <p>{job.salary}</p>
                    <p>{job.status}</p>
                    <button onClick={()=>navigate(`/edit-job/${job._id}`)}>Edit</button>
                    <button>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default Dashboard