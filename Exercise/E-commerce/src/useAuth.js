import React from 'react'

const useAuth = () => {
  const adminToken = localStorage.getItem('adminToken')
  if (adminToken) return true
  return false
}

export default useAuth
