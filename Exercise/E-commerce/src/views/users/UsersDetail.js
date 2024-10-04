import React from 'react'
import { RegisteredDateFormat } from '../../global'
import { CAvatar, CContainer, CRow, CCol } from '@coreui/react'
import { IoArrowBackCircleSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import greenAvatar from 'src/assets/images/avatars/Avatar_icon_green.png'
const UsersDetail = () => {
  const userData = history.state.usr
  const navigate = useNavigate()

  return (
    <>
      <div>
        {userData && (
          <CContainer className="bg-body p-4">
            <IoArrowBackCircleSharp
              className="custom-pointer"
              size={25}
              onClick={() => navigate(-1)}
            />
            <CRow>
              <CCol>
                <CAvatar size="xl" className="m-4" src={greenAvatar} />
                <span className="fs-2 fw-bold">{userData.name}</span>
              </CCol>
            </CRow>
            <CRow className="my-3">
              <CCol className="mx-5 px-4">
                <span className="fs-5">
                  <b>User ID: </b> {userData.id}
                </span>
              </CCol>
            </CRow>
            <CRow className="my-3">
              <CCol className="mx-5 px-4">
                <span className="fs-5">
                  <b>Email:</b> {userData.email}
                </span>
              </CCol>
            </CRow>
            <CRow className="my-3">
              <CCol className="mx-5 px-4">
                <span className="fs-5">
                  <b>Name: </b>
                  {userData.name}
                </span>
              </CCol>
            </CRow>
            <CRow className="my-3">
              <CCol className="mx-5 px-4">
                <span className="fs-5">
                  <b>Address: </b>
                  {userData.address ? userData.address : "Haven't yet"}
                </span>
              </CCol>
            </CRow>
            <CRow className="my-3">
              <CCol className="mx-5 px-4">
                <span className="fs-5">
                  <b>Status: </b> {userData.status === 1 ? 'Actived' : 'Unactivated'}
                </span>
              </CCol>
            </CRow>
            <CRow className="my-3">
              <CCol className="mx-5 px-4">
                <span className="fs-5">
                  <b>Registered Day: </b>
                  {RegisteredDateFormat(userData.createdDate)}
                </span>
              </CCol>
            </CRow>
          </CContainer>
        )}
      </div>
    </>
  )
}

export default UsersDetail
