import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const Editjob = () => {

    const [job, setJob] = React.useState(null);
    const { id } = useParams();
    const navigate = useNavigate();


    const editHandler = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`http://localhost:3001/jobs/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    setJob(response.data);
}

    const updateJobHandler = async () => {
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
    }

    useEffect(() => {
        editHandler();
    }, [])

    console.log(id)
    return (
        <div>
            {job && (
                <>
                    <input
                        type="text"
                        value={job.company}
                        onChange={(e) => setJob({ ...job, company: e.target.value })}
                    />

                    <input
                        type="text"
                        value={job.title}
                        onChange={(e) => setJob({ ...job, title: e.target.value })}
                    />

                    <input
                        type="text"
                        value={job.location}
                        onChange={(e) => setJob({ ...job, location: e.target.value })}
                    />

                    <input
                        type="text"
                        value={job.salary}
                        onChange={(e) => setJob({ ...job, salary: e.target.value })}
                    />

                    <input
                        type="text"
                        value={job.status}
                        onChange={(e) => setJob({ ...job, status: e.target.value })}
                    />
                    <button onClick={updateJobHandler}>Update Job</button>
                </>
            )}

        </div>
    )
}
