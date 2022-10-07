import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProductsDetails from './pages/ProductsDetails'
import Purchases from './pages/Purchases'
import MyNavbar from './components/MyNavBar'
import LoadingScreen from './components/LoadingScreen'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProductsThunk } from './store/slices/products.slice'
import { Container } from 'react-bootstrap'
import Login from './pages/Login'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  return (
      <HashRouter>
        <MyNavbar/>
        {isLoading && <LoadingScreen/>}
        <Container>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/products/:id' element={<ProductsDetails/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route element={<ProtectedRoutes />}>
              <Route path='/purchases' element={<Purchases/>}/>
            </Route>
          </Routes>
        </Container>
      </HashRouter>

  )
}

export default App
