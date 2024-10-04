import React from 'react'
import { RegisteredDateFormat } from '../../global'
import { CAvatar, CContainer, CRow, CCol } from '@coreui/react'
import { IoArrowBackCircleSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const TransferDetail = () => {
  const walletData = history.state.usr
  const navigate = useNavigate()

  return (
    <>
      <div>
        {walletData && (
          <CContainer className="bg-body">
            <IoArrowBackCircleSharp
              className="custom-pointer"
              size={25}
              onClick={() => navigate(-1)}
            />
            <CRow className="px-5">
              <CCol md={5}>
                <span className="fs-5">
                  <b>Wallet ID: </b> {walletData.id}
                </span>
              </CCol>
              <CCol md={5}>
                <span className="fs-5">
                  <b>Owner Name: </b> {walletData.ownerName}
                </span>
              </CCol>
            </CRow>
            {Object.keys(walletData.bankConnect).length > 0 && (
              <div className="fw-bold fs-5 px-5">Bank Connect:</div>
            )}
            {Object.keys(walletData.bankConnect).length > 0 &&
              walletData.bankConnect.map((item, index) => {
                return (
                  <div key={index} className="px-5 my-3">
                    <CRow className="px-5">
                      <CCol md={6}>
                        <span className="fs-6">
                          <b>Bank Name: </b>
                          {item.bankName}
                        </span>
                      </CCol>
                      <CCol md={6}>
                        <span className="fs-6">
                          <b>Bank Brand: </b>
                          {item.bankBrand}
                        </span>
                      </CCol>
                    </CRow>
                    <CRow className="px-5">
                      <CCol md={4}>
                        <span className="fs-6">
                          <b>Logo: </b>
                        </span>
                        <img width={80} className="border" src={`/images/bank/${item.logo}`} />
                      </CCol>
                      <CCol md={4} className="d-flex align-items-center">
                        <span className="fs-6">
                          <b>Status: </b>
                          {item.status}
                        </span>
                      </CCol>
                      <CCol md={4} className="d-flex align-items-center">
                        <span className="fs-6">
                          <b>Total ($): </b>
                          {item.totalMoney}
                        </span>
                      </CCol>
                    </CRow>
                  </div>
                )
              })}
            <CRow className="px-5 my-2">
              <CCol md={12}>
                <span className="fs-5">
                  <b>Code: </b> {walletData.code}
                </span>
              </CCol>
            </CRow>
            <CRow className="px-5 my-2">
              <CCol md={12}>
                <span className="fs-5">
                  <b>Code Wallet: </b> {walletData.codeWallet}
                </span>
              </CCol>
            </CRow>
            <CRow className="px-5 my-2">
              <CCol md={12}>
                <span className="fs-5">
                  <b>Created Date: </b> {RegisteredDateFormat(walletData.createdDate)}
                </span>
              </CCol>
            </CRow>
            <CRow className="px-5 my-2">
              <CCol md={12}>
                <span className="fs-5">
                  <b>Total Money ($): </b> {walletData.totalMoney}
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
