import { useState } from 'react'
import Sidebar from '@/components/AdminPanel/Sidebar'
import Header from '@/components/AdminPanel//Header'
import ProductTable from '@/components/AdminPanel/ProductTable'
import AddProductDialog from '@/components/AdminPanel/AddProductDialog'
import AdminMobileFallback from '@/components/AdminPanel/AdminMobileFallback'
import productsData from '@/data/products.json'

const AdministrationPanel = () => {
  const [products, setProducts] = useState(productsData)

  return (
    <div key='1' className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
      <Sidebar />
      <div className='flex flex-col'>
        <Header products={products} />
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
          <div className='flex items-center'>
            <h1 className='font-semibold text-lg md:text-2xl'>Productos</h1>
            <AddProductDialog />
          </div>
          <ProductTable products={products} setProducts={setProducts} />
        </main>
      </div>
      <AdminMobileFallback />
    </div>
  )
}

export default AdministrationPanel
