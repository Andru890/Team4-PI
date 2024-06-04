import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../routes/routes'
import ItemDetailContainer from '../components/ItemDetailContainer/ItemDetailContainer'

const Products = () => {
  return (
    <>
      <Header />
      <main className=''>
        <Routes>
          <Route path={routes.itemDetail} element={<ItemDetailContainer />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default Products
