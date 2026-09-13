import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div>
            <button
            onClick={handleLogout}
            className="border border-slate-300 hover:bg-slate-100 transition-colors text-slate-700 font-medium rounded-lg px-4 py-2"
            >
                Logout
            </button>
        </div>
    )
}