import React from 'react'
import { RegisteredDateFormat } from '../../global'
import { CAvatar, CContainer, CRow, CCol } from '@coreui/react'
import { IoArrowBackCircleSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const TransferDetail = () => {
  const transferData = history.state.usr
  const navigate = useNavigate()

  return (
    <>
      <div>
        {transferData && (
          <CContainer className="bg-body p-4">
            <IoArrowBackCircleSharp
              className="custom-pointer"
              size={25}
              onClick={() => navigate(-1)}
            />
            <CRow>
              <CCol className="mx-5 px-4">
                <span className="fs-5">
                  <b>Transaction ID: </b> {transferData.id}
                </span>
              </CCol>
            </CRow>
            {transferData.bankName && (
              <CRow className="my-3">
                <CCol className="mx-5 px-4">
                  <span className="fs-5">
                    <b>Bank: </b> {transferData.bankName}
                  </span>
                </CCol>
              </CRow>
            )}
            <CRow className="my-3">
              <CCol className="mx-5 px-4">
                <span className="fs-5">
                  <b>Created Date: </b> {RegisteredDateFormat(transferData.createdDate)}
                </span>
              </CCol>
            </CRow>
            {transferData.type !== 'USE_SERVICE' && (
              <CRow className="my-3">
                <CCol className="mx-5 px-4">
                  <span className="fs-5">
                    <b>Receiver Name: </b> {transferData.receiverName}
                  </span>
                </CCol>
              </CRow>
            )}
            {transferData.senderName && (
              <CRow className="my-3">
                <CCol className="mx-5 px-4">
                  <span className="fs-5">
                    <b>Sender Name: </b>
                    {transferData.senderName}
                  </span>
                </CCol>
              </CRow>
            )}

            <CRow className="my-3">
              <CCol className="mx-5 px-4">
                <span className="fs-5">
                  <b>Total Money ($): </b> {transferData.totalMoney}
                </span>
              </CCol>
            </CRow>
            {transferData.description && (
              <CRow className="my-3">
                <CCol className="mx-5 px-4">
                  <span className="fs-5">
                    <b>Description: </b>
                    {transferData.description}
                  </span>
                </CCol>
              </CRow>
            )}
            <CRow className="my-3">
              <CCol className="mx-5 px-4">
                <span className="fs-5">
                  <b>Type: </b>
                  {transferData.type === 'RECHARGE' && (
                    <span className="text-danger fw-bold">Recharge</span>
                  )}
                  {transferData.type === 'TRANSFER_MONEY' && (
                    <span className="text-info fw-bold">Transfer money</span>
                  )}
                  {transferData.type === 'USE_SERVICE' && (
                    <span className="text-success fw-bold">Use service</span>
                  )}
                  {transferData.type === 'SAVING_MONEY' && (
                    <span className="text-warning fw-bold">Profit money</span>
                  )}
                </span>
              </CCol>
            </CRow>
          </CContainer>
        )}
      </div>
    </>
  )
}

export default TransferDetail
