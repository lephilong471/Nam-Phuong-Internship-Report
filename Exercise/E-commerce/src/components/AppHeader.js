import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { getCurrentTime } from '../global'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import moonIcon from 'src/assets/images/icons/moon.svg'
import sunIcon from '/src/assets/images/icons/sun.svg'
import bellIcon from '/src/assets/images/icons/bell.svg'
import contrastIcon from '/src/assets/images/icons/contrast.svg'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [clock, setClock] = useState(null)
  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })

    const t = setInterval(() => setClock(getCurrentTime()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          {/* <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          {clock && (
            <CNavItem className="d-flex align-items-center">
              <div className="fw-bold custom-main-color border-top border-bottom border-success-subtle px-1">
                {clock}
              </div>
            </CNavItem>
          )}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CNavItem>
            <CNavLink to="/admin-notifications" as={NavLink}>
              <img src={bellIcon} />
              {/* <CIcon icon={cilBell} size="lg" /> */}
            </CNavLink>
          </CNavItem>
          {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                // <CIcon icon={cilMoon} size="lg" />
                <img src={moonIcon} />
              ) : colorMode === 'auto' ? (
                // <CIcon icon={cilContrast} size="lg" />
                <img src={contrastIcon} />
              ) : (
                // <CIcon icon={cilSun} size="lg" />
                <img src={sunIcon} />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                {/* <CIcon className="me-2" icon={cilSun} size="lg" /> Light */}
                <img src={sunIcon} className="me-2 my-1" /> <div className="fw-semibold">Light</div>
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                {/* <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark */}
                <img src={moonIcon} className="me-2 my-1" /> <div className="fw-semibold">Dark</div>
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                {/* <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto */}
                <img src={contrastIcon} className="me-2 my-1" />
                <div className="fw-semibold">Auto</div>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
