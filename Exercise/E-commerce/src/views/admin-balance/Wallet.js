import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../config'
import { useNavigate } from 'react-router-dom'

import {
  CRow,
  CCol,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormSelect,
} from '@coreui/react'

import { DateRange } from 'react-date-range'
import { GrView } from 'react-icons/gr'
import {
  convertToISO,
  getRangeTotalMoney,
  RegisteredDateFormat,
  getTableData,
  returnPaginationRange,
  getRequestParams,
  getRequestData,
  searchByKeyword,
} from '../../global'
import { MdSavings } from 'react-icons/md'
import { LuCalendarDays } from 'react-icons/lu'
import { CiFilter } from 'react-icons/ci'
import { IoSearchOutline } from 'react-icons/io5'
import { DataNotFound } from '../../components/DataNotFound'
import WalletDB from '../../database/WalletDB'

const Wallet = () => {
  const [data, setData] = useState(null)
  const adminToken = localStorage.getItem('adminToken')
  const navigate = useNavigate()

  // Table pagination
  const [pageData, setPageData] = useState(null)
  const [page, setPage] = useState(1)
  const limit = 5
  const [totalPage, setTotalPage] = useState(1)
  const [paginate, setPaginate] = useState(null)

  //   const [openDate, setOpenDate] = useState(false)

  //   const [dateRange, setDateRange] = useState([
  //     {
  //       startDate: new Date(),
  //       endDate: new Date(),
  //       key: 'selection',
  //     },
  //   ])

  const [keyword, setKeyword] = useState('')

  const [filterInfo, setFilterInfo] = useState({
    id: '',
    ownerName: '',
    code: '',
    codeWallet: '',
    fromDate: '',
    toDate: '',
    totalMoneyFrom: config.initTotalRange[0],
    totalMoneyTo: config.initTotalRange[1],
  })

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

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: `${config.proxy}/api/v1/admin/wallet?${getRequestParams(filterInfo)}`,
  //     headers: {
  //       Authorization: 'Bearer ' + adminToken,
  //     },
  //   }).then(function (res) {
  //     if (res.status === 200) {
  //       setPageData(getTableData(res.data, page, limit))
  //       setPaginate(returnPaginationRange(Math.ceil(res.data.length / limit), page, limit, 1))
  //       setTotalPage(Math.ceil(res.data.length / limit))
  //       setData(res.data)
  //     }
  //   })
  // }, [filterInfo])

  useEffect(() => {
    const res = getRequestData(WalletDB, getRequestParams(filterInfo))
    setPageData(getTableData(res, page, limit))
    setPaginate(returnPaginationRange(Math.ceil(res.length / limit), page, limit, 1))
    setTotalPage(Math.ceil(res.length / limit))
    setData(res)
  }, [filterInfo])

  const viewDetail = (item) => {
    navigate('/balance/wallet_detail', { state: item })
  }

  const handleInfo = (event) => {
    const { value, name } = event.target
    setFilterInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRangeTotalMoney = (event) => {
    const value = event.target.selectedOptions[0].value
    switch (value) {
      case '0':
        setFilterInfo((prev) => ({
          ...prev,
          totalMoneyFrom: config.initTotalRange[0],
          totalMoneyTo: config.initTotalRange[1],
        }))
        break
      case '1':
        setFilterInfo((prev) => ({
          ...prev,
          totalMoneyFrom: config.initTotalRange[0],
          totalMoneyTo: 49,
        }))
        break
      case '2':
        setFilterInfo((prev) => ({
          ...prev,
          totalMoneyFrom: 50,
          totalMoneyTo: 99,
        }))
        break
      case '3':
        setFilterInfo((prev) => ({
          ...prev,
          totalMoneyFrom: 100,
          totalMoneyTo: 499,
        }))
        break
      case '4':
        setFilterInfo((prev) => ({
          ...prev,
          totalMoneyFrom: 500,
          totalMoneyTo: 999,
        }))
        break
      case '5':
        setFilterInfo((prev) => ({
          ...prev,
          totalMoneyFrom: 1000,
          totalMoneyTo: config.initTotalRange[1],
        }))
        break
    }
  }
  const handleSearch = () => {
    setData(null)
    setPageData(null)
    const res = searchByKeyword(WalletDB, keyword)
    setPageData(getTableData(res, page, limit))
    setPaginate(returnPaginationRange(Math.ceil(res.length / limit), page, limit, 1))
    setTotalPage(Math.ceil(res.length / limit))
    setData(res)
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
            <CTableHeaderCell scope="col" className="bg-body-tertiary start w-10">
              <CRow>
                <CCol>
                  <MdSavings className="me-1 text-primary fs-5" />
                  ID
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
            <CTableHeaderCell scope="col" className="bg-body-tertiary text-start w-10">
              <CRow>
                <CCol>Owner Name</CCol>
              </CRow>
              <CRow className="m-2"></CRow>
              <CRow>
                <CCol>
                  <CFormInput
                    type="text"
                    value={filterInfo.ownerName}
                    name="ownerName"
                    placeholder="Owner name"
                    onChange={handleInfo}
                    size="sm"
                  />
                </CCol>
              </CRow>
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="bg-body-tertiary text-start w-10">
              <CRow>
                <CCol>Code</CCol>
              </CRow>
              <CRow className="m-2"></CRow>
              <CRow>
                <CCol>
                  <CFormInput
                    type="text"
                    value={filterInfo.code}
                    name="code"
                    placeholder="Code"
                    onChange={handleInfo}
                    size="sm"
                  />
                </CCol>
              </CRow>
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="bg-body-tertiary text-start w-10">
              <CRow>
                <CCol>Code Wallet</CCol>
              </CRow>
              <CRow className="m-2"></CRow>
              <CRow>
                <CCol>
                  <CFormInput
                    type="text"
                    value={filterInfo.codeWallet}
                    name="codeWallet"
                    placeholder="Code wallet"
                    onChange={handleInfo}
                    size="sm"
                  />
                </CCol>
              </CRow>
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="bg-body-tertiary text-start w-10">
              <CRow>
                <CCol>Total ($)</CCol>
              </CRow>
              <CRow className="m-2"></CRow>
              <CRow>
                <CCol>
                  <CFormSelect
                    type="text"
                    value={getRangeTotalMoney(filterInfo.totalMoneyFrom, filterInfo.totalMoneyTo)}
                    name="totalMoney"
                    placeholder="Total"
                    onChange={handleRangeTotalMoney}
                    size="sm"
                  >
                    <option value={0}>All</option>
                    <option value={1}>0 - 49</option>
                    <option value={2}>50 - 99</option>
                    <option value={3}>100 - 499</option>
                    <option value={4}>500 - 999</option>
                    <option value={5}> &rsaquo; 1000</option>
                  </CFormSelect>
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
                    name="fromDate"
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
                    name="toDate"
                    onChange={(event) =>
                      setFilterInfo((prev) => ({
                        ...prev,
                        toDate: !event.target.value ? '' : convertToISO(event.target.value),
                      }))
                    }
                    size="sm"
                  />
                  {/* {openDate && (
              <DateRange
                className="position-absolute border my-5"
                ranges={dateRange}
                onChange={(item) => setDateRange([item.selection])}
              />
            )} */}
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
                      <div className="fw-bold">{item.id}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{item.ownerName}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.code}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div className="fs-6">{item.codeWallet}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div className="fs-6">{item.totalMoney}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
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

export default Wallet
