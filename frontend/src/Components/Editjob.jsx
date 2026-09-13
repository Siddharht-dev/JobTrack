import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const Editjob = () => {

    const [job, setJob] = React.useState(null);
    const { id } = useParams();
    const navigate = useNavigate();


    const editHandler = async () => {
    try {
        const token = localStorage.getItem("token");



        const response = await axios.get(`http://localhost:3001/jobs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setJob(response.data);
    } catch (error) {
        console.error("Error fetching job:", error);
    }
}

    const updateJobHandler = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(`http://localhost:3001/jobs/${id}`, {
                company: job.company,
                title: job.title,
                location: job.location,
                salary: job.salary,
                status: job.status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/")
        } catch (error) {
            console.error("Error updating job:", error);
        }
    }

    useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    editHandler();
}, [])

    console.log(id)
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            {job && (
                <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
                    <h1 className="text-2xl font-semibold text-slate-800 mb-6">Edit Job</h1>

                    <input
                        type="text"
                        value={job.company}
                        onChange={(e) => setJob({ ...job, company: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="text"
                        value={job.title}
                        onChange={(e) => setJob({ ...job, title: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="text"
                        value={job.location}
                        onChange={(e) => setJob({ ...job, location: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="text"
                        value={job.salary}
                        onChange={(e) => setJob({ ...job, salary: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="text"
                        value={job.status}
                        onChange={(e) => setJob({ ...job, status: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                    onClick={updateJobHandler}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-medium rounded-lg py-2"
                    >
                        Update Job
                    </button>
                </div>
            )}
        </div>
    )
}