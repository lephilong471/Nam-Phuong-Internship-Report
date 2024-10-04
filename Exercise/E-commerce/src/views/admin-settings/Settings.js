import React, { useState, useEffect, useRef } from 'react'
import {
  CForm,
  CFormInput,
  CCol,
  CFormLabel,
  CButton,
  CAlert,
  CRow,
  CFormSelect,
} from '@coreui/react'
import axios from 'axios'
import config from '../../config'
import { FaWifi } from 'react-icons/fa'
import { MdElectricBolt, MdSavings } from 'react-icons/md'
import { IoIosWater } from 'react-icons/io'
import { PiCoinsFill } from 'react-icons/pi'
import { HiOutlineRocketLaunch } from 'react-icons/hi2'
import { LiaCoinsSolid } from 'react-icons/lia'
import { TfiWallet } from 'react-icons/tfi'
import {
  waterSet,
  electricSet,
  internetSet,
  wincoinSet,
  wincoinValueSet,
  savingWalletSet,
} from '../../database/SettingsDB'

const Settings = () => {
  const [water, setWater] = useState(null)
  const [electric, setElectric] = useState(null)
  const [internet, setInternet] = useState(null)
  const [wincoin, setWincoin] = useState(null)
  const [wincoinValue, setWincoinValue] = useState(null)
  const [savingWallet, setSavingWallet] = useState(null)

  const adminToken = localStorage.getItem('adminToken')

  const [success, setSuccess] = useState(false)
  const [danger, setDanger] = useState(false)

  const [disabled, setDisabled] = useState(false)

  const tradeType = ['PERCENT', 'CASH']

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

  useEffect(() => {
    setWater(waterSet)
    setElectric(electricSet)
    setInternet(internetSet)
    setWincoin(wincoinSet)
    setWincoinValue(wincoinValueSet)
    setSavingWallet(savingWalletSet)
  }, [])

  const handleUpdate = (request_name, obj) => {
    if (request_name === 'company-revenue') {
      if (obj.revenue && obj.revenue > 0) {
        setDisabled(true)
        showAlert('success')
        setDisabled(false)
      } else {
        showAlert('danger')
      }
    } else if (request_name === 'system-config') {
      if (obj.value && obj.value > 0) {
        setDisabled(true)
        showAlert('success')
        setDisabled(false)
      } else {
        showAlert('danger')
      }
    }
  }

  const handleOption = (event) => {
    const name = event.target.name
    const value = event.target.selectedOptions[0].value

    switch (name) {
      case 'water':
        setWater((prev) => ({
          ...prev,
          tradeType: value,
        }))
        break
      case 'electric':
        setElectric((prev) => ({
          ...prev,
          tradeType: value,
        }))
        break
      case 'internet':
        setInternet((prev) => ({
          ...prev,
          tradeType: value,
        }))
        break
    }
  }
  const handleChange = (event) => {
    const { value, name } = event.target
    switch (name) {
      case 'water':
        setWater((prev) => ({
          ...prev,
          revenue: value,
        }))
        break
      case 'electric':
        setElectric((prev) => ({
          ...prev,
          revenue: value,
        }))
        break
      case 'internet':
        setInternet((prev) => ({
          ...prev,
          revenue: value,
        }))
        break
      case 'wincoin':
        setWincoin((prev) => ({
          ...prev,
          value: value,
        }))
        break
      case 'wincoin_value':
        setWincoinValue((prev) => ({
          ...prev,
          value: value,
        }))
        break
      case 'saving_wallet':
        setSavingWallet((prev) => ({
          ...prev,
          value: value,
        }))
        break
    }
  }
  return (
    <div>
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
          Invalid Information
        </CAlert>
      </div>
      {water && electric && internet && wincoin && wincoinValue && savingWallet ? (
        <CForm className="row g-3 justify-content-center">
          <CCol md={8} xs={12}>
            <div className="fw-bold h4">Profit Config</div>
          </CCol>

          <CCol md={8} xs={12}>
            <CRow>
              <CCol md={4} xs={12}>
                <CFormLabel htmlFor="water" className="col-form-label">
                  <IoIosWater className="fs-4 text-info" /> Water Fee
                </CFormLabel>
              </CCol>
              <CCol md={3} xs={6}>
                <CFormInput
                  className="w-100"
                  type="number"
                  name="water"
                  id="water"
                  value={water.revenue}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={3} xs={4}>
                <CFormSelect onChange={handleOption} name="water" value={water.tradeType}>
                  {tradeType.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item === 'PERCENT' ? '%' : '$'}
                      </option>
                    )
                  })}
                </CFormSelect>
              </CCol>
              <CCol md={2} xs={2}>
                <CButton
                  className={disabled ? 'disabled' : null}
                  color="info"
                  onClick={() => handleUpdate('company-revenue', water)}
                >
                  <HiOutlineRocketLaunch className="fs-5 fw-bold text-light" />
                </CButton>
              </CCol>
            </CRow>
          </CCol>

          <CCol md={8} xs={12}>
            <CRow>
              <CCol md={4} xs={12}>
                <CFormLabel htmlFor="electric" className="col-form-label">
                  <MdElectricBolt className="fs-4 text-danger" /> Electric Fee
                </CFormLabel>
              </CCol>
              <CCol md={3} xs={6}>
                <CFormInput
                  className="w-100"
                  type="number"
                  name="electric"
                  id="electric"
                  value={electric.revenue}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={3} xs={4}>
                <CFormSelect onChange={handleOption} name="electric" value={electric.tradeType}>
                  {tradeType.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item === 'PERCENT' ? '%' : '$'}
                      </option>
                    )
                  })}
                </CFormSelect>
              </CCol>
              <CCol md={2} xs={2}>
                <CButton
                  className={disabled ? 'disabled' : null}
                  color="info"
                  onClick={() => handleUpdate('company-revenue', electric)}
                >
                  <HiOutlineRocketLaunch className="fs-5 fw-bold text-light" />
                </CButton>
              </CCol>
            </CRow>
          </CCol>

          <CCol md={8} xs={12}>
            <CRow>
              <CCol md={4} xs={12}>
                <CFormLabel htmlFor="internet" className="col-form-label">
                  <FaWifi className="fs-4 text-primary" /> Internet Fee
                </CFormLabel>
              </CCol>
              <CCol md={3} xs={6}>
                <CFormInput
                  className="w-100"
                  type="number"
                  name="internet"
                  id="internet"
                  value={internet.revenue}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={3} xs={4}>
                <CFormSelect onChange={handleOption} name="internet" value={internet.tradeType}>
                  {tradeType.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item === 'PERCENT' ? '%' : '$'}
                      </option>
                    )
                  })}
                </CFormSelect>
              </CCol>
              <CCol md={2} xs={2}>
                <CButton
                  className={disabled ? 'disabled' : null}
                  color="info"
                  onClick={() => handleUpdate('company-revenue', internet)}
                >
                  <HiOutlineRocketLaunch className="fs-5 fw-bold text-light" />
                </CButton>
              </CCol>
            </CRow>
          </CCol>
          <div className="my-1" />
          <CCol md={8} xs={12}>
            <div className="fw-bold h4">App Config</div>
          </CCol>
          <CCol md={8} xs={12}>
            <CRow>
              <CCol md={4} xs={6}>
                <CFormLabel htmlFor="wincoin" className="col-form-label">
                  <PiCoinsFill className="fs-4 text-warning" /> Wincoin
                </CFormLabel>
              </CCol>
              <CCol md={6} xs={4}>
                <CFormInput
                  className="w-100"
                  type="number"
                  name="wincoin"
                  id="wincoin"
                  value={wincoin.value}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={2} xs={2}>
                <CButton
                  className={disabled ? 'disabled' : null}
                  color="info"
                  onClick={() => handleUpdate('system-config', wincoin)}
                >
                  <HiOutlineRocketLaunch className="fs-5 fw-bold text-light" />
                </CButton>
              </CCol>
            </CRow>
          </CCol>

          <CCol md={8} xs={12}>
            <CRow>
              <CCol md={4} xs={6}>
                <CFormLabel htmlFor="wincoin_value" className="col-form-label">
                  <div className="text-nowrap">
                    <LiaCoinsSolid className="fs-4 text-warning" /> Wincoin Value
                  </div>
                </CFormLabel>
              </CCol>
              <CCol md={6} xs={4}>
                <CFormInput
                  className="w-100"
                  type="number"
                  name="wincoin_value"
                  id="wincoin_value"
                  value={wincoinValue.value}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={2} xs={2}>
                <CButton
                  className={disabled ? 'disabled' : null}
                  color="info"
                  onClick={() => handleUpdate('system-config', wincoinValue)}
                >
                  <HiOutlineRocketLaunch className="fs-5 fw-bold text-light" />
                </CButton>
              </CCol>
            </CRow>
          </CCol>

          <CCol md={8} xs={12}>
            <CRow>
              <CCol md={4} xs={6}>
                <CFormLabel htmlFor="saving_wallet" className="col-form-label">
                  <div className="text-nowrap">
                    <MdSavings className="fs-4 text-primary" /> Saving Wallet
                  </div>
                </CFormLabel>
              </CCol>
              <CCol md={6} xs={4}>
                <CFormInput
                  className="w-100"
                  type="number"
                  name="saving_wallet"
                  id="saving_wallet"
                  value={savingWallet.value}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={2} xs={2}>
                <CButton
                  className={disabled ? 'disabled' : null}
                  color="info"
                  onClick={() => handleUpdate('system-config', savingWallet)}
                >
                  <HiOutlineRocketLaunch className="fs-5 fw-bold text-light" />
                </CButton>
              </CCol>
            </CRow>
          </CCol>
          <div className="my-1" />
        </CForm>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="custom-loading" />
        </div>
      )}
    </div>
  )
}

export default Settings
