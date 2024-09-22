import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../App'
function DashboardHome() {
    const navigate = useNavigate()
    const {setAdmin}=useContext(AdminContext)
    const handleLogout = () =>{
        localStorage.clear()
        setAdmin(false)
        navigate("/")
    }
  return (
    <div>DashboardHome
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DashboardHome