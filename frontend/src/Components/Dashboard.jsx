//This componnet's work is to send JWT from local storage to the backend, and also show jobs according to the user
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Logout } from "./Logout";

const Dashboard = () => {

    const navigate = useNavigate();

    const [jobs, setJobs] = React.useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }
        handleGetJobs();
        console.log("Dashboard opened")

    }, [])


    const deleteJobHandler = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.delete(`http://localhost:3001/jobs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setJobs(jobs.filter((job) => job._id !== id));
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    }


    const handleGetJobs = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3001/jobs", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setJobs(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    }
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
                    <Logout />
                </div>

                <button
                onClick={() => navigate("/add-job")}
                className="mb-6 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium rounded-lg px-4 py-2"
                >
                    Add Job
                </button>

                <div className="flex flex-col gap-4">
                    {jobs.map((job) => (
                        <div
                        key={job._id}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex items-center justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">{job.company}</h3>
                                <p className="text-slate-600">{job.title}</p>
                                <p className="text-slate-500 text-sm">{job.location}</p>
                                <p className="text-slate-500 text-sm">{job.salary}</p>
                                <p className="text-slate-500 text-sm">{job.status}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                onClick={() => navigate(`/edit-job/${job._id}`)}
                                className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-medium rounded-lg px-3 py-2"
                                >
                                    Edit
                                </button>
                                <button
                                onClick={() => deleteJobHandler(job._id)}
                                className="bg-red-500 hover:bg-red-600 transition-colors text-white font-medium rounded-lg px-3 py-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard