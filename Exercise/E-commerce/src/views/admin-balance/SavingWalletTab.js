import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../config'
import { useNavigate } from 'react-router-dom'

import { getBankImage, RegisteredDateFormat } from '../../global'
import {
  CAvatar,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabs,
  CTabList,
  CTab,
  CTabPanel,
  CTabContent,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilMoney } from '@coreui/icons'
import { GrView } from 'react-icons/gr'
import { getTableData, returnPaginationRange } from '../../global'
import { MdSavings } from 'react-icons/md'
import SavingWallet from './SavingWallet'
import SavingWalletOfUser from './SavingWalletOfUser'

const SavingWalletTab = () => {
  return (
    <>
      <CTabs activeItemKey={1}>
        <CTabList layout="justified" variant="underline-border">
          <CTab className="text-info" aria-controls="saving-wallet-of-transaction" itemKey={1}>
            Saving Wallet Transaction
          </CTab>
          <CTab className="text-info" aria-controls="saving-wallet-of-user" itemKey={2}>
            Saving Wallet Of User
          </CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel className="py-3" aria-labelledby="saving-wallet-of-transaction" itemKey={1}>
            <SavingWallet />
          </CTabPanel>
          <CTabPanel className="py-3" aria-labelledby="saving-wallet-of-user" itemKey={2}>
            <SavingWalletOfUser />
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  )
}

export default SavingWalletTab
