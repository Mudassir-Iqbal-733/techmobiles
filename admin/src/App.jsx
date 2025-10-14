import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Products from './pages/dashboard/Products'
import CreateProductForm from './pages/dashboard/CreateProductForm'
import NotFound from './pages/NotFound'
import ProtectedRoute from './pages/ProtectedRoute'

const App = () => {
  return (
  <>
  <Routes>
    <Route index element={<Login />} />

    <Route path='/dashboard' element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
    <Route index element={<Dashboard />} />
    <Route path='profile' element={<Profile />} />
    <Route path='settings' element={<Settings />} />
    <Route path='products' element={<Products />} />
    <Route path='create' element={<CreateProductForm />} />
    </Route>

    <Route path='*' element={<NotFound />} />
  </Routes>
  </>
  )
}

export default App