import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'
import { GrView } from 'react-icons/gr'
import {
  getTableData,
  returnPaginationRange,
  RegisteredDateFormat,
  getRequestParams,
  convertToISO,
  getRequestData,
} from '../../global'
import {
  CTabs,
  CTabList,
  CTab,
  CTabPanel,
  CTabContent,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CFormInput,
  CRow,
  CCol,
  CButton,
  CForm,
  CFormTextarea,
  CFormLabel,
  CAlert,
} from '@coreui/react'
import { IoNotificationsSharp } from 'react-icons/io5'
import AdminNotificationDB from '../../database/AdminNotificationDB'
import { DataNotFound } from '../../components/DataNotFound'

const AdminNotifications = () => {
  const [data, setData] = useState(null)
  const [allData, setAllData] = useState(null)
  const navigate = useNavigate()
  const adminToken = localStorage.getItem('adminToken')

  // Table pagination
  const [pageData, setPageData] = useState(null)
  const [page, setPage] = useState(1)
  const limit = 5
  const [totalPage, setTotalPage] = useState(1)
  const [paginate, setPaginate] = useState(null)

  const [check, setCheck] = useState(false)
  const [predict, setPredict] = useState(null)
  const [status, setStatus] = useState(0)

  const [filterInfo, setFilterInfo] = useState({
    id: '',
    title: '',
    content: '',
    fromDate: '',
    toDate: '',
  })

  const [addInfo, setAddInfo] = useState({
    title: '',
    content: '',
  })

  const [keyword, setKeyword] = useState('')

  const [success, setSuccess] = useState(false)
  const [danger, setDanger] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleInfo = (event) => {
    const { value, name } = event.target
    setFilterInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onPageChange = (item) => {
    if (typeof item === 'string') {
      if (item === '<' && page > 1) {
        handlePageChange(page - 1)
      } else if (item === '>' && page < totalPage) {
        handlePageChange(page + 1)
      }
    } else {
      handlePageChange(item)
    }
  }

  const handlePageChange = (pageChange) => {
    setPage(pageChange)
    setPageData(getTableData(data, pageChange, limit))
    setPaginate(returnPaginationRange(totalPage, pageChange, limit, 1))
  }

  const showAlert = (name) => {
    if (name === 'success') {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 1500)
    } else if (name === 'danger') {
      setDanger(true)
      setTimeout(() => {
        setDanger(false)
      }, 1500)
    }
  }

  const handleSubmit = () => {
    if (!addInfo.title || !addInfo.content) showAlert('danger')
    else {
      setDisabled(true)
      showAlert('success')
      setAddInfo({ title: '', content: '' })
      setDisabled(false)
    }
  }

  const handleClearCheck = () => {
    setStatus(0)
    setCheck(false)
    setPredict(null)
  }

  const handleCheckSentiment = () => {
    if (!addInfo.content) showAlert('danger')
    else {
      setStatus(1)
      axios({
        method: 'POST',
        url: `${config.proxy}/api/check-sentiment-data`,
        data: {
          data: addInfo.content,
        },
      })
        .then(function (res) {
          if (res.status === 200) {
            setPredict(res.data.predict)
            setCheck(true)
            setStatus(2)
          }
        })
        .catch(function () {
          setStatus(0)
          setCheck(false)
        })
    }
  }

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: `${config.proxy}/api/v1/admin/notification?${getRequestParams(filterInfo)}`,
  //     headers: {
  //       Authorization: 'Bearer ' + adminToken,
  //     },
  //   })
  //     .then(function (res) {
  //       if (res.status === 200) {
  //         setPageData(getTableData(res.data, page, limit))
  //         setPaginate(returnPaginationRange(Math.ceil(res.data.length / limit), page, limit, 1))
  //         setTotalPage(Math.ceil(res.data.length / limit))
  //         setAllData(res.data)
  //         setData(res.data)
  //       }
  //     })
  //     .catch((error) => console.log(error))
  // }, [filterInfo, disabled])

  useEffect(() => {
    const res = getRequestData(AdminNotificationDB, getRequestParams(filterInfo))
    setPageData(getTableData(res, page, limit))
    setPaginate(returnPaginationRange(Math.ceil(res.length / limit), page, limit, 1))
    setTotalPage(Math.ceil(res.length / limit))
    setAllData(res)
    setData(res)
  }, [filterInfo])

  const viewDetail = (data) => {
    navigate('/admin-notifications/detail', { state: data })
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <CAlert
          color="success"
          className="custom-alert"
          dismissible
          visible={success}
          onClose={() => setSuccess(false)}
        >
          Config Updated Successfully
        </CAlert>
        <CAlert
          color="danger"
          className="custom-alert"
          dismissible
          visible={danger}
          onClose={() => setDanger(false)}
        >
          Please Fill All Information
        </CAlert>
      </div>
      <CTabs activeItemKey={2}>
        <CTabList variant="underline" layout="justified">
          <CTab className="text-warning" aria-controls="list" itemKey={1}>
            List Notification
          </CTab>
          <CTab className="text-info" aria-controls="add" itemKey={2}>
            Add New Notification
          </CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel className="py-3" aria-labelledby="list" itemKey={1}>
            <CTable align="middle" className="mb-0 border" hover responsive bordered>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell scope="col" className="bg-body-tertiary text-start w-10">
                    <CRow>
                      <CCol>
                        <IoNotificationsSharp className="text-warning fs-5" /> ID
                      </CCol>
                    </CRow>
                    <CRow className="m-2"></CRow>
                    <CRow>
                      <CCol>
                        <CFormInput
                          type="text"
                          value={filterInfo.id}
                          name="id"
                          placeholder="ID"
                          onChange={handleInfo}
                          size="sm"
                        />
                      </CCol>
                    </CRow>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="bg-body-tertiary text-start">
                    <CRow>
                      <CCol>Title</CCol>
                    </CRow>
                    <CRow className="m-2"></CRow>
                    <CRow>
                      <CCol>
                        <CFormInput
                          type="text"
                          value={filterInfo.title}
                          name="title"
                          placeholder="Title"
                          onChange={handleInfo}
                          size="sm"
                        />
                      </CCol>
                    </CRow>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="bg-body-tertiary text-start">
                    <CRow>
                      <CCol>Content</CCol>
                    </CRow>
                    <CRow className="m-2"></CRow>
                    <CRow>
                      <CCol>
                        <CFormInput
                          type="text"
                          value={filterInfo.content}
                          name="content"
                          placeholder="Content"
                          onChange={handleInfo}
                          size="sm"
                        />
                      </CCol>
                    </CRow>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="bg-body-tertiary text-center w-40">
                    <CRow>
                      <CCol>Created</CCol>
                    </CRow>
                    <CRow className="m-2"></CRow>
                    <CRow>
                      <CCol md={6}>
                        <CFormInput
                          type="date"
                          onChange={(event) =>
                            setFilterInfo((prev) => ({
                              ...prev,
                              fromDate: !event.target.value ? '' : convertToISO(event.target.value),
                            }))
                          }
                          size="sm"
                        />
                      </CCol>

                      <CCol md={6}>
                        <CFormInput
                          type="date"
                          onChange={(event) =>
                            setFilterInfo((prev) => ({
                              ...prev,
                              toDate: !event.target.value ? '' : convertToISO(event.target.value),
                            }))
                          }
                          size="sm"
                        />
                      </CCol>
                    </CRow>
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    className="bg-body-tertiary text-center align-middle w-10"
                  >
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {pageData &&
                  pageData.map((item, index) => {
                    if (item)
                      return (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <div>{item.id}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item.title}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">{item.content}</CTableDataCell>
                          <CTableDataCell className="text-center">
                            {/* {!item.address ? 'User not updated yet' : item.address} */}
                            {/* <CIcon size="xl" icon={item.payment.icon} /> */}
                            {RegisteredDateFormat(item.createdDate)}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <GrView className="custom-pointer" onClick={() => viewDetail(item)} />
                          </CTableDataCell>
                        </CTableRow>
                      )
                  })}
                {data && Object.keys(data).length === 0 && <DataNotFound colSpan={7} />}
              </CTableBody>
            </CTable>
            {!data && (
              <div className="d-flex justify-content-center m-2">
                <div className="custom-loading" />
              </div>
            )}
            {data && Object.keys(data).length > 0 && (
              <ul className="pagination pagination-md justify-content-end my-2">
                <li className="page-item pe">
                  <span
                    className="page-link border border-info text-info"
                    onClick={() => onPageChange('<')}
                  >
                    &lsaquo;
                  </span>
                </li>
                {paginate &&
                  paginate.map((item, key) => {
                    if (item === page) {
                      return (
                        <li key={key} className="page-item active">
                          <span className="page-link border border-info bg-info">{item}</span>
                        </li>
                      )
                    }
                    return (
                      <li key={key} className="page-item pe">
                        <span
                          className="page-link border border-info text-info"
                          onClick={() => onPageChange(item)}
                        >
                          {item}
                        </span>
                      </li>
                    )
                  })}
                <li className="page-item pe">
                  <span
                    className="page-link border border-info text-info"
                    onClick={() => onPageChange('>')}
                  >
                    &rsaquo;
                  </span>
                </li>
              </ul>
            )}
          </CTabPanel>
          <CTabPanel className="py-3" aria-labelledby="add" itemKey={2}>
            <CForm>
              <CRow className="my-2 d-flex justify-content-center">
                <CCol md={6}>
                  <CFormLabel htmlFor="title" className="fs-5 fw-bold fst-italic">
                    Title
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="title"
                    name="title"
                    className="border border-info"
                    value={addInfo.title}
                    onChange={(e) => setAddInfo((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </CCol>
              </CRow>
              <CRow className="my-2 d-flex justify-content-center">
                <CCol md={6}>
                  <CFormLabel htmlFor="content">
                    <span className="fs-5 fw-bold fst-italic">Content</span>
                    {predict &&
                      (predict === 'negative' ? (
                        <span className="text-warning fw-bold fst-italic fw-none mx-2">
                          Negative
                        </span>
                      ) : (
                        <span className="text-success fw-bold fst-italic fw-none mx-2">
                          Positive
                        </span>
                      ))}
                  </CFormLabel>

                  <CFormTextarea
                    className="border border-info"
                    value={addInfo.content}
                    onChange={(e) => setAddInfo((prev) => ({ ...prev, content: e.target.value }))}
                  />
                </CCol>
              </CRow>
              <CRow className="my-2 d-flex justify-content-center">
                <CCol md={6} className="d-flex">
                  <CButton
                    onClick={handleSubmit}
                    className={disabled ? 'disabled fw-bold' : 'fw-bold'}
                    variant="outline"
                    color="info"
                  >
                    Add
                  </CButton>
                  <span className="mx-2" />
                  {status === 1 && <div className="custom-loading" />}
                  {check && status === 2 && (
                    <CButton
                      onClick={handleClearCheck}
                      className={disabled ? 'disabled fw-bold' : 'fw-bold'}
                      variant="outline"
                      color="secondary"
                    >
                      Clear
                    </CButton>
                  )}
                  {!check && status === 0 && (
                    <CButton
                      onClick={handleCheckSentiment}
                      className={disabled ? 'disabled fw-bold' : 'fw-bold'}
                      variant="outline"
                      color="secondary"
                    >
                      Check Sentiment
                    </CButton>
                  )}
                </CCol>
              </CRow>
            </CForm>
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  )
}

export default AdminNotifications
