import React from 'react'
import { IoArrowBackCircleSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { CContainer, CRow, CCol } from '@coreui/react'
import { RegisteredDateFormat } from '../../global'

const NotificationDetail = () => {
  const data = history.state.usr
  console.log(data)
  const navigate = useNavigate()
  return (
    <>
      {data && (
        <CContainer className="bg-body p-4">
          <IoArrowBackCircleSharp
            className="custom-pointer"
            size={25}
            onClick={() => navigate(-1)}
          />
          <CRow className="my-3">
            <CCol className="mx-5 px-4">
              <span className="fs-5">
                <b>ID: </b> {data.id}
              </span>
            </CCol>
          </CRow>
          <CRow className="my-3">
            <CCol className="mx-5 px-4">
              <span className="fs-5">
                <b>Title:</b> {data.title}
              </span>
            </CCol>
          </CRow>
          <CRow className="my-3">
            <CCol className="mx-5 px-4">
              <span className="fs-5">
                <b>Content: </b>
                {data.content}
              </span>
            </CCol>
          </CRow>
          <CRow className="my-3">
            <CCol className="mx-5 px-4">
              <span className="fs-5">
                <b>Created Date: </b>
                {RegisteredDateFormat(data.createdDate)}
              </span>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </>
  )
}

export default NotificationDetail
