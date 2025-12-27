import { Route } from 'react-router-dom'
import CmsDashboard from './pages/CmsDashboard'

export const cmsRoutes = [
  <Route key="cms" path="/cms" element={<CmsDashboard />} />,
]

