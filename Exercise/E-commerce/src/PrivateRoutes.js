import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from './useAuth'

const PrivateRoutes = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
