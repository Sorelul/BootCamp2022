import React from 'react'
import { useLocation,Navigate,Outlet } from 'react-router-dom'
const IsAuth_log = () => {
    const location = useLocation();
    const token = sessionStorage.getItem('token');

  return (
    token
        ? <Navigate to="/home" state={{from:location}} replace/>
        : <Outlet/>

        
  );
}

export default IsAuth_log