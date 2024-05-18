import { Routes, Route } from 'react-router-dom'
import { routes } from '@/routes/routes'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import AdministrationPanel from '@/pages/AdministrationPanel'
import ItemListContainer from '@/components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from '@/components/ItemDetailContainer/ItemDetailContainer'
import SearchBar from '@/components/SearchBar'

const Layout = () => {
  return (
    <>
      <Routes>
        <Route
          path={routes.home}
          element={
            <>
              <SearchBar />
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path={routes.category}
          element={
            <>
              <Header />
              <ItemListContainer />
              <Footer />
            </>
          }
        />
        <Route
          path={routes.itemDetail}
          element={
            <>
              <Header />
              <ItemDetailContainer />
              <Footer />
            </>
          }
        />
        <Route
          path={routes.notFound}
          element={
            <>
              <Header />
              <NotFound />
              <Footer />
            </>
          }
        />
        <Route
          path={routes.administrationPanel}
          element={<AdministrationPanel />}
        />
      </Routes>
    </>
  )
}

export default Layout
