import { Routes } from 'react-router-dom'
import Layout from './shared/components/Layout'
import { dashboardRoutes } from './modules/dashboard/routes'
import { cmsRoutes } from './modules/cms/routes'

function App() {
  return (
    <Layout>
      <Routes>
        {/* Dashboard Module Routes */}
        {dashboardRoutes}
        
        {/* CMS Module Routes */}
        {cmsRoutes}
      </Routes>
    </Layout>
  )
}

export default App
