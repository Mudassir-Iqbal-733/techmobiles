import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Filters from './pages/Filter'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ShoppingCartPage from './pages/ShoppingCartPage'
import ProtectedRoute from './components/ProtectedRoute'
import UserOrdersPage from './pages/UserOrdersPage'


const App = () => {
  return (
    <>
    <Routes>
      <Route index element={<Home />} />
      <Route path='/filter' element={<Filters />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/cart' element={<ShoppingCartPage />} />
       <Route path='/orders' element={ <ProtectedRoute><UserOrdersPage /></ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App