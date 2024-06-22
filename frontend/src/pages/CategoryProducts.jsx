import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '@/context/global.context'
import { useAuthContext } from '@/context/auth.context'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { HeartIcon } from '@/components/Icons'
import { toast, Toaster } from 'sonner'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const CategoryProducts = () => {
  const { categoryId } = useParams()
  const { state, handleGetCategoryById, dispatch } = useGlobalContext()
  const { user } = useAuthContext()

  useEffect(() => {
    handleGetCategoryById(categoryId)
  }, [categoryId, handleGetCategoryById])

  const { categorySelected } = state

  const handleFav = (product) => {
    if (!user) {
      toast.warning('Inicia sesión para guardar tus favoritos')
      return
    }

    const isFav = state.favs.some((fav) => fav.id === product.id)
    if (isFav) {
      dispatch({ type: 'DEL_FAV', payload: product })
      toast.success(`El producto ${product.name} fue eliminado de favoritos`)
    } else {
      dispatch({ type: 'ADD_FAV', payload: product })
      toast.success(`El producto ${product.name} fue añadido a favoritos`)
    }
  }

  return (
    <>
      <Header />
      <div className='container mx-auto p-4 mt-20'>
        <div className='relative mb-8'>
          <img
            src={categorySelected?.imageUrl}
            alt={categorySelected?.name}
            className='w-full h-64 object-cover rounded-lg shadow-lg'
          />
          <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-lg p-4'>
            <h1 className='text-4xl font-bold text-white mb-2'>
              {categorySelected?.name}
            </h1>
            <p className='text-lg text-white'>
              {categorySelected?.description}
            </p>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categorySelected?.products &&
          categorySelected.products.length > 0 ? (
            categorySelected.products.map((product) => {
              const isFav = state.favs.some((fav) => fav.id === product.id)
              return (
                <Card
                  className='bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
                  key={product.id}
                >
                  <div className='relative'>
                    <img
                      src={
                        product.images[0]
                          ? product.images[0]
                          : '/placeholder.svg'
                      }
                      alt={product.name ? product.name : 'Producto nuevo'}
                      className='w-full h-48 object-cover rounded-t-lg'
                      style={{ aspectRatio: '300/300' }}
                    />
                    <button
                      className='absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300'
                      onClick={() => handleFav(product)}
                    >
                      <HeartIcon
                        className={`h-6 w-6 transition-colors duration-300 ${
                          isFav ? 'text-red-500 fill-current' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                  <CardContent className='space-y-4 p-6'>
                    <h3 className='text-xl font-semibold text-gray-800'>
                      {product.name}
                    </h3>
                    <p className='text-gray-600'>{product.description}</p>
                    <div className='flex justify-between items-center'>
                      <Link to={`/product/${product.id}`}>
                        <Button className='px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-300'>
                          Ver detalles
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <p className='text-center'>
              No se encontraron productos para esta categoría.
            </p>
          )}
        </div>
      </div>
      <Footer />
      <Toaster richColors />
    </>
  )
}

export default CategoryProducts
