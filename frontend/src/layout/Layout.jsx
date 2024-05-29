import { Routes, Route } from 'react-router-dom'
import { routes } from '@/routes/routes'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Contact from '@/pages/Contact'
import Services from '@/pages/Services'
import AdminDashboard from '@/components/AdminPanel/AdminDashboard'
import AdminUsers from '@/components/AdminPanel/AdminUsers'
import AdminProducts from '@/components/AdminPanel/AdminProducts'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ItemDetailContainer from '@/components/ItemDetailContainer/ItemDetailContainer'
import AdminCategories from '@/components/AdminPanel/AdminCategories'
import AdminOrders from '@/components/AdminPanel/AdminOrders'
import AdminFeatures from '@/components/AdminPanel/AdminFeatures'
import Categories from '@/pages/Categories'
import Profile from '@/pages/Profile'
import { PrivateRoute, AdminGuard } from '@/routes/AuthGuard'

const Layout = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />}>
        <Route path={routes.itemDetail} element={<ItemDetailContainer />} />
      </Route>
      <Route path={routes.contact} element={<Contact />} />
      <Route path={routes.services} element={<Services />} />
      <Route path={routes.categories} element={<Categories />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route path={routes.profile} element={<Profile />} />
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
