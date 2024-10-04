import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
} from '@coreui/react'

import axios from 'axios'
import config from '../../config'
import { getTableData, returnPaginationRange, searchByKeyword } from '../../global'
import { DataNotFound } from '../../components/DataNotFound'
import BankDB from '../../database/BankDB'

const Bank = () => {
  const [pageData, setPageData] = useState(null) // Total row of data will be showed
  const [data, setData] = useState(null) // All of data will get from API

  const [allData, setAllData] = useState(null) // When search value is empty. Return original data without call API

  const adminToken = localStorage.getItem('adminToken')
  const [page, setPage] = useState(1) // The page index
  const limit = 5 // The number of row's data will be displayed
  const [totalPage, setTotalPage] = useState(1) // Total of the page
  const [paginate, setPaginate] = useState(null) // The pagination row where user click to move previous or next page

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

  useEffect(() => {
    setPageData(getTableData(BankDB, page, limit))
    setPaginate(returnPaginationRange(Math.ceil(BankDB.length / limit), page, limit, 1))
    setTotalPage(Math.ceil(BankDB.length / limit))
    setData(BankDB)
    setAllData(BankDB)
  }, [])

  const handlePageChange = (pageChange) => {
    setPage(pageChange)
    setPageData(getTableData(data, pageChange, limit))
    setPaginate(returnPaginationRange(totalPage, pageChange, limit, 1))
  }

  const handleSearch = (event) => {
    const value = event.target.value
    if (value !== null || value !== '') {
      const res = searchByKeyword(BankDB, value)
      setData(res)
      setTotalPage(Math.ceil(res.length / limit))
      setPageData(getTableData(res, 1, limit))
      setPaginate(returnPaginationRange(Math.ceil(res.length / limit), 1, limit, 1))
      setPage(1)
    } else {
      setPageData(getTableData(allData, 1, limit))
      setPaginate(returnPaginationRange(Math.ceil(allData.length / limit), 1, limit, 1))
      setTotalPage(Math.ceil(allData.length / limit))
      setData(allData)
    }
  }
  return (
    <>
      <div className="d-flex justify-content-start mb-2">
        <CFormInput
          type="text"
          name="search"
          onChange={handleSearch}
          className="w-25"
          placeholder="Search"
        />
      </div>

      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell scope="col" className="bg-body-tertiary text-center">
              ID
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="bg-body-tertiary text-center">
              Code
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="bg-body-tertiary text-center">
              Name
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="bg-body-tertiary text-center">
              Logo
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {pageData &&
            pageData.map((item, index) => {
              if (item)
                return (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">{item.id}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.code}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.name}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <img width={80} src={`images/bank/${item.logo}`} />
                    </CTableDataCell>
                  </CTableRow>
                )
            })}
          {data && Object.keys(data).length === 0 && <DataNotFound colSpan={5} />}
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

export default Bank
