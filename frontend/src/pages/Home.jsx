import { Routes, Route } from 'react-router-dom'
import { routes } from '@/routes/routes'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ProductRoutes from '@/components/ProductRoutes' // Asegúrate de importar este componente
import ItemDetailContainer from '@/components/ItemDetailContainer/ItemDetailContainer'

const Home = () => {
  return (
    <>
      <Header />
      <main className=''>
        <Routes>
          <Route path={routes.home} element={<ProductRoutes />} />
          <Route path={routes.itemDetail} element={<ItemDetailContainer />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default Home
