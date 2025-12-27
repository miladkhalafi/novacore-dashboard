import { Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Menus from './pages/Menus'
import Settings from './pages/Settings'

export const dashboardRoutes = [
  <Route key="dashboard" path="/" element={<Dashboard />} />,
  <Route key="menus" path="/menus" element={<Menus />} />,
  <Route key="settings" path="/settings" element={<Settings />} />,
]

