import { Routes, Route } from 'react-router-dom'
import { routes } from '@/routes/routes'
import ItemListContainer from '@/components/ItemListContainer/ItemListContainer'
import Category from '@/components/Category'
import SearchBar from '@/components/SearchBar'
import Banner from '@/components/Banner'

const ProductRoutes = () => {
  return (
    <>
      <Banner />
      <Routes>
        <Route path={routes.home} element={<ItemListContainer />} />
        <Route path={routes.category} element={<Category />} />
      </Routes>
      <Category />
    </>
  )
}

export default ProductRoutes
