import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useGlobalContext } from '@/context/global.context'
import { routes } from '@/routes/routes'
import AdminSidebar from '@/components/AdminPanel/AdminSidebar'
import AdminHeader from '@/components/AdminPanel/AdminHeader'
import AdminMobileFallback from '@/components/AdminPanel/AdminMobileFallback'
import AdminProducts from '@/components/AdminPanel/AdminProducts'
import AdminUsers from '@/components/AdminPanel/AdminUsers'
import AdminCategories from '@/components/AdminPanel/AdminCategories'
import AdminOrders from '@/components/AdminPanel/AdminOrders'
import AdminDashboard from '@/components/AdminPanel/AdminDashboard'
import AdminFeatures from '@/components/AdminPanel/AdminFeatures'
import NotFound from './NotFound'

const Dashboard = () => {
  const { state } = useGlobalContext()
  const { data: products } = state
  const { pathname } = useLocation()

  const [productCount, setProductCount] = useState(0)

  useEffect(() => {
    setProductCount(products.length)
  }, [products])

  let content
  switch (pathname) {
    case routes.dashboard:
      content = <AdminDashboard productCount={productCount} />
      break
    case routes.dashboardproducts:
      content = (
        <>
          <AdminHeader products={products} />
          <AdminProducts products={products} />
        </>
      )
      break
    case routes.dashboardusers:
      content = <AdminUsers />
      break
    case routes.dashboardcategories:
      content = <AdminCategories />
      break
    case routes.dashboardorders:
      content = <AdminOrders />
      break
    case routes.dashboardfeatures:
      content = <AdminFeatures />
      break
    default:
      content = <NotFound />
  }

  return (
    <div key='1' className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
      <AdminSidebar />
      <div className='flex flex-col'>{content}</div>
      <AdminMobileFallback />
      <Toaster />
    </div>
  )
}

export default Dashboard
