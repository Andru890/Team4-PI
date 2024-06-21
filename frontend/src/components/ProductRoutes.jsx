import { Routes, Route } from 'react-router-dom'
import { routes } from '@/routes/routes'
import ItemListContainer from '@/components/ItemListContainer/ItemListContainer'
import Category from '@/components/Category'
import Banner from '@/components/Banner'
import Services from '@/components/Services'

const ProductRoutes = () => {
  return (
    <>
      <Banner />
      <Routes>
        <Route path={routes.home} element={<ItemListContainer />} />
        <Route path={routes.category} element={<Category />} />
      </Routes>
      <Category />
      <Services />
    </>
  )
}

export default ProductRoutes
