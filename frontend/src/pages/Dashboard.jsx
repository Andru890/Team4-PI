import { Toaster } from 'sonner'
import { useGlobalContext } from '@/context/global.context'
import AdminSidebar from '@/components/AdminPanel/AdminSidebar'
import AdminHeader from '@/components/AdminPanel/AdminHeader'
import AdminMobileFallback from '@/components/AdminPanel/AdminMobileFallback'
import AdminProducts from '@/components/AdminPanel/AdminProducts'
import AdminUsers from '@/components/AdminPanel/AdminUsers'
import AdminCategories from '@/components/AdminPanel/AdminCategories'
import AdminOrders from '@/components/AdminPanel/AdminOrders'
import { useLocation } from 'react-router-dom'
import AdminDashboard from '../components/AdminPanel/AdminDashboard'
import AdminFeatures from '../components/AdminPanel/AdminFeatures'

const Dashboard = () => {
  const { state } = useGlobalContext()
  const { data: products } = state
  const { pathname } = useLocation()

  let content
  switch (pathname) {
    case '/administracion/':
      content = <AdminDashboard />
      break
    case '/administracion/products':
      content = (
        <>
          <AdminHeader products={products} />
          <AdminProducts products={products} />
        </>
      )
      break
    case '/administracion/users':
      content = <AdminUsers />
      break
    case '/administracion/categories':
      content = <AdminCategories />
      break
    case '/administracion/orders':
      content = <AdminOrders />
      break
    case '/administracion/features':
      content = <AdminFeatures />
      break
    default:
      content = <p>Invalid route</p>
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
