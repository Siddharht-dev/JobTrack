//This componnet's work is to send JWT from local storage to the backend, and also show jobs according to the user

import axios from 'axios';
import React from 'react'

 const Dashboard = () => {

    const handleGetJobs = async ()=>{
        const token  = localStorage.getItem("token");
        
        const response = await axios.get("http://localhost:3001/jobs", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        console.log(response.data);
    }
  return (
    <div>
        <h1>Dashboard</h1>
        <button onClick={handleGetJobs}>Get my jobs</button>
    </div>
  )
}

export default Dashboard