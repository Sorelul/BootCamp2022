import React from 'react'
import { useLocation,Navigate,Outlet } from 'react-router-dom'
const IsAuth = () => {
    const location = useLocation();
    const token = sessionStorage.getItem('token');

  return (
    token
        ? <Outlet/>
        : <Navigate to="/login" state={{from:location}} replace/>

        
  );
}

export default IsAuth