import React from 'react'

// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Users = React.lazy(() => import('./views/users/Users'))
// const UsersDetail = React.lazy(() => import('./views/users/UsersDetail'))
// const Electricity = React.lazy(() => import('./views/service/Electricity'))
// const Internet = React.lazy(() => import('./views/service/Internet'))
// const Vehicle = React.lazy(() => import('./views/service/Vehicle'))
// const Water = React.lazy(() => import('./views/service/Water'))
// const ServiceDetail = React.lazy(() => import('./views/service/ServiceDetail'))
// const TransferHistory = React.lazy(() => import('./views/admin-balance/TransferHistory'))
// const TransferDetail = React.lazy(() => import('./views/admin-balance/TransferDetail'))
// const Bank = React.lazy(() => import('./views/admin-balance/Bank'))
// const Settings = React.lazy(() => import('./views/admin-settings/Settings'))

import Dashboard from './views/dashboard/Dashboard'
import Users from './views/users/Users'
import UsersDetail from './views/users/UsersDetail'
import Electricity from './views/service/Electricity'
import Internet from './views/service/Internet'
import Water from './views/service/Water'
import ServiceDetail from './views/service/ServiceDetail'
import TransferHistory from './views/admin-balance/TransferHistory'
import TransferDetail from './views/admin-balance/TransferDetail'
import Bank from './views/admin-balance/Bank'
import Settings from './views/admin-settings/Settings'
import Wallet from './views/admin-balance/Wallet'
import WalletDetail from './views/admin-balance/WalletDetail'
import SavingWalletTab from './views/admin-balance/SavingWalletTab'
import AdminNotifications from './views/admin-notifications/AdminNotifications'
import NotificationDetail from './views/admin-notifications/NotificationDetail'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: Users },
  { path: '/users/detail', name: 'Detail', element: UsersDetail },
  { path: '/service/electricity', name: 'Service / Electricity', element: Electricity },
  { path: '/service/water', name: 'Service / Water', element: Water },
  { path: '/service/internet', name: 'Service / Internet', element: Internet },
  // { path: '/service/vehicle', name: 'Service / Vehicle', element: Vehicle },
  { path: '/service/detail', name: 'Service / Detail', element: ServiceDetail },
  {
    path: '/balance/transfer_history',
    name: 'Balance / Transfer History',
    element: TransferHistory,
  },
  { path: '/balance/bank', name: 'Balance / Bank', element: Bank },
  { path: '/balance/transfer_detail', name: 'Balance / Transfer Detail', element: TransferDetail },
  { path: '/balance/wallet', name: 'Balance / Wallet', element: Wallet },
  { path: '/balance/wallet_detail', name: 'Balance / Wallet Detail', element: WalletDetail },
  { path: '/balance/saving_wallet', name: 'Balance / Saving Wallet', element: SavingWalletTab },
  { path: '/settings', name: 'Settings', element: Settings },
  { path: '/admin-notifications', name: 'Admin Notifications', element: AdminNotifications },
  { path: '/admin-notifications/detail', name: 'Detail', element: NotificationDetail },
]

export default routes
