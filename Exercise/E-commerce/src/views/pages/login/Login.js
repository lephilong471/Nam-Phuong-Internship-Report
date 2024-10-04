import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import config from '../../../config'
import { useNavigate } from 'react-router-dom'
import capybara from '/src/assets/images/icons/capybara.svg'

const Login = () => {
  const [data, setData] = useState({
    username: 'capyadmin@gmail.com',
    password: '123456',
  })
  const [click, setClick] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { value, name } = event.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    if (data.username.length === 0 || data.password.length === 0)
      alert('Please fill your information')
    else {
      setClick(true)
      if (data.username === 'capyadmin@gmail.com' && data.password === '123456') {
        localStorage.setItem('adminToken', 'capyadmin@gmail.com123456')
        setClick(false)
        navigate('/')
      } else {
        setClick(false)
        alert('Unauthorized')
      }
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-3">
                <CCardBody>
                  <CForm className="text-center">
                    {/* <div className="pb-4 custom-main-color h1">Capy Admin</div> */}
                    <img width="60" className="my-2" src={capybara} />
                    {/* <p className="text-body-secondary">Sign In to your account</p> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} className="d-flex justify-content-center">
                        {click ? (
                          <div className="custom-loading"></div>
                        ) : (
                          <CButton
                            variant="outline"
                            color="info"
                            className="px-4"
                            onClick={handleSubmit}
                          >
                            Login
                          </CButton>
                        )}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
