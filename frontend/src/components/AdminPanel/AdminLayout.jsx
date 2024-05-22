import { Routes, Route } from 'react-router-dom'
import { routes } from '@/routes/routes'
import AdminHeader from '@/components/AdminPanel/AdminHeader'
import AdminSidebar from '@/components/AdminPanel/AdminSidebar'
import AdminMobileFallback from '@/components/AdminPanel/AdminMobileFallback'
import AdminHome from '@/components/AdminPanel/AdminHome'
import AdminFeatures from '@/components/AdminPanel/AdminFeatures'
import AdminOrders from '@/components/AdminPanel/AdminOrders'
import AdminCustomers from '@/components/AdminPanel/AdminCustomers'
import AdminReports from '@/components/AdminPanel/AdminReports'
import ProductTable from '@/components/AdminPanel/ProductTable'
import AddProductDialog from '@/components/AdminPanel/AddProductDialog'
import { useGlobalContext } from '@/Context/global.context'

const AdminLayout = () => {
  const { state, handleAddProduct, handleDeleteProduct } = useGlobalContext()
  const { data: products } = state
  console.log(products)
  console.log(routes)

  return (
    <div key='1' className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
      <AdminSidebar />
      <div className='flex flex-col'>
        <AdminHeader products={products} />
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
          <div className='flex items-center'>
            <h1 className='font-semibold text-lg md:text-2xl'>Productos</h1>
            <AddProductDialog handleAddProduct={handleAddProduct} />
          </div>
          <Routes>
            <Route path={routes.adminHome} element={<AdminHome />} />
            <Route
              path={routes.productsList}
              element={
                <ProductTable
                  products={products}
                  handleDeleteProduct={handleDeleteProduct}
                />
              }
            />
            <Route path={routes.features} element={<AdminFeatures />} />
            <Route path={routes.orders} element={<AdminOrders />} />
            <Route path={routes.customers} element={<AdminCustomers />} />
            <Route path={routes.reports} element={<AdminReports />} />
          </Routes>
        </main>
      </div>
      <AdminMobileFallback />
    </div>
  )
}

export default AdminLayout
