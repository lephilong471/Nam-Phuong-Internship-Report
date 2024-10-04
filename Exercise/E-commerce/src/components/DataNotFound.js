import React from 'react'
import PropTypes from 'prop-types'

import { CTableRow, CTableDataCell } from '@coreui/react'
import oopsIcon from 'src/assets/images/icons/oops.svg'

export const DataNotFound = ({ colSpan }) => {
  return (
    <CTableRow>
      <CTableDataCell className="text-center" colSpan={colSpan}>
        <img src={oopsIcon} width="40" className="me-2" />
        <span className="fs-5 fw-bold fst-italic custom-main-color">Data Not Found</span>
      </CTableDataCell>
    </CTableRow>
  )
}

DataNotFound.propTypes = {
  colSpan: PropTypes.number.isRequired,
}
