import { Routes, Route, Outlet } from 'react-router-dom'
import { routes } from '@/routes/routes'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Contact from '@/pages/Contact'
import AdminDashboard from '@/components/AdminPanel/AdminDashboard'
import AdminUsers from '@/components/AdminPanel/Users/AdminUsers'
import AdminProducts from '@/components/AdminPanel/Products/AdminProducts'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ItemDetailContainer from '@/components/ItemDetailContainer/ItemDetailContainer'
import AdminCategories from '@/components/AdminPanel/Category/AdminCategories'
import AdminOrders from '@/components/AdminPanel/Orders/AdminOrders'
import AdminFeatures from '@/components/AdminPanel/Features/AdminFeatures'
import Categories from '@/pages/Categories'
import CategoryProducts from '@/pages/CategoryProducts' // Asegúrate de importar tu nuevo componente
import Profile from '@/pages/Profile'
import { PrivateRoute, AdminGuard } from '@/routes/AuthGuard'
import Favs from '@/pages/Favs'
import WhatsAppButton from '@/components/WhatsAppButton'
import ReservationPage from '@/pages/ReservationPage' // Importa la página de reservas

const PublicLayout = () => (
  <div>
    <WhatsAppButton />
    <Outlet />
  </div>
)

const Layout = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={routes.home} element={<Home />}>
          <Route path={routes.itemDetail} element={<ItemDetailContainer />} />
        </Route>
        <Route path={routes.contact} element={<Contact />} />
        <Route path={routes.categories} element={<Categories />} />
        <Route path={routes.categoryDetail} element={<CategoryProducts />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.reservation} element={<ReservationPage />} />{' '}
        {/* Agrega esta línea */}
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={routes.profile} element={<Profile />} />
        <Route path={routes.favs} element={<Favs />} />
        <Route
          path={routes.dashboard}
          element={
            <AdminGuard>
              <Dashboard />
            </AdminGuard>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path={routes.dashboardorders} element={<AdminOrders />} />
          <Route path={routes.dashboardfeatures} element={<AdminFeatures />} />
          <Route path={routes.dashboardusers} element={<AdminUsers />} />
          <Route path={routes.dashboardproducts} element={<AdminProducts />} />
          <Route
            path={routes.dashboardcategories}
            element={<AdminCategories />}
          />
        </Route>
      </Route>
      <Route path={routes.notFound} element={<NotFound />} />
    </Routes>
  )
}

export default Layout
