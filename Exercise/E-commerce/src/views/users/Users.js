import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'

import { cilPeople } from '@coreui/icons'
// import avatar1 from 'src/assets/images/avatars/1.jpg'
// import avatar2 from 'src/assets/images/avatars/2.jpg'
// import avatar3 from 'src/assets/images/avatars/3.jpg'
// import avatar4 from 'src/assets/images/avatars/4.jpg'
// import avatar5 from 'src/assets/images/avatars/5.jpg'
// import avatar6 from 'src/assets/images/avatars/6.jpg'

import greenAvatar from 'src/assets/images/avatars/Avatar_icon_green.png'
import { GrView } from 'react-icons/gr'
import axios from 'axios'
import config from '../../config'
import {
  getTableData,
  returnPaginationRange,
  RegisteredDateFormat,
  getRequestParams,
  getRequestData,
  convertToISO,
  searchByKeyword,
} from '../../global'
import { TfiControlShuffle } from 'react-icons/tfi'
import { IoSearchOutline } from 'react-icons/io5'
import { DataNotFound } from '../../components/DataNotFound'
import UsersDB from '../../database/UsersDB'

const Users = () => {
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

  const [filterInfo, setFilterInfo] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    createdDateFrom: '',
    createdDateTo: '',
  })

  const [keyword, setKeyword] = useState('')

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

  const handleSearch = () => {
    setData(null)
    setPageData(null)

    if (keyword !== null || keyword !== '') {
      const res = searchByKeyword(UsersDB, keyword)
      setData(res)
      setTotalPage(Math.ceil(res.length / limit))
      setPageData(getTableData(res, 1, limit))
      setPaginate(returnPaginationRange(Math.ceil(res.length / limit), 1, limit, 1))
      setPage(1)
    } else {
      setPageData(getTableData(allData, 1, limit))
      setPaginate(returnPaginationRange(Math.ceil(allData.length / limit), 1, limit, 1))
      setTotalPage(Math.ceil(allData / limit))
      setData(allData)
    }
  }
  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: `${config.proxy}/api/v1/admin/consumer/profiles?${getRequestParams(filterInfo)}`,
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
  // }, [filterInfo])
  useEffect(() => {
    const res = getRequestData(UsersDB, getRequestParams(filterInfo))
    setPageData(getTableData(res, page, limit))
    setPaginate(returnPaginationRange(Math.ceil(res.length / limit), page, limit, 1))
    setTotalPage(Math.ceil(res.length / limit))
    setAllData(res)
    setData(res)
  }, [filterInfo])

  const viewDetail = (user) => {
    navigate('/users/detail', { state: user })
  }

  return (
    <>
      <div className="d-flex mb-4">
        <CFormInput
          type="text"
          name="keyword"
          className="w-25 me-2"
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Keyword"
        />
        <CButton variant="outline" color="info">
          <IoSearchOutline className="fs-5 fw-bold text-primary" onClick={handleSearch} />
        </CButton>
      </div>

      <CTable align="middle" className="mb-0 border" hover responsive bordered>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary text-center w-10 align-middle">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="bg-body-tertiary text-start w-10">
              <CRow>
                <CCol>ID</CCol>
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
            <CTableHeaderCell scope="col" className="bg-body-tertiary text-start w-10">
              <CRow>
                <CCol>Name</CCol>
              </CRow>
              <CRow className="m-2"></CRow>
              <CRow>
                <CCol>
                  <CFormInput
                    type="text"
                    value={filterInfo.name}
                    name="name"
                    placeholder="Name"
                    onChange={handleInfo}
                    size="sm"
                  />
                </CCol>
              </CRow>
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="bg-body-tertiary text-start w-10">
              <CRow>
                <CCol>Email</CCol>
              </CRow>
              <CRow className="m-2"></CRow>
              <CRow>
                <CCol>
                  <CFormInput
                    type="text"
                    value={filterInfo.email}
                    name="email"
                    placeholder="Email"
                    onChange={handleInfo}
                    size="sm"
                  />
                </CCol>
              </CRow>
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="bg-body-tertiary text-start w-10">
              <CRow>
                <CCol>Phone</CCol>
              </CRow>
              <CRow className="m-2"></CRow>
              <CRow>
                <CCol>
                  <CFormInput
                    type="text"
                    value={filterInfo.phone}
                    name="phone"
                    placeholder="Phone"
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
                        createdDateFrom: !event.target.value
                          ? ''
                          : convertToISO(event.target.value),
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
                        createdDateTo: !event.target.value ? '' : convertToISO(event.target.value),
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
                      <CAvatar size="md" src={greenAvatar} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.id}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.name}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{item.email}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.phone}</CTableDataCell>
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
    </>
  )
}

export default Users
