import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useGlobalContext } from '@/context/global.context'
import { useAuthContext } from '@/context/auth.context'
import { toast, Toaster } from 'sonner'

import { HeartIcon } from '@/components/Icons'

const Item = ({ product }) => {
  const { state, dispatch } = useGlobalContext()
  const { user } = useAuthContext()
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(state.favs.some((fav) => fav.id === product.id))
  }, [state.favs, product.id])

  const handleFav = () => {
    if (!user) {
      toast.warning('Inicia sesión para guardar tus favoritos')
      return
    }

    if (isFav) {
      dispatch({ type: 'DEL_FAV', payload: product })
      toast.success(`El producto ${product.name} fue eliminado de favoritos`)
    } else {
      dispatch({ type: 'ADD_FAV', payload: product })
      toast.success(`El producto ${product.name} fue añadido a favoritos`)
    }
    setIsFav(!isFav)
  }

  return (
    <Card
      className='w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
      id='productos'
    >
      <div className='relative'>
        <img
          src={product.images[0] ? product.images[0] : '/placeholder.svg'}
          alt={product.name ? product.name : 'Producto nuevo'}
          className='w-full h-48 object-cover rounded-t-lg'
          style={{ aspectRatio: '300/300' }}
        />
        <button
          className='absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300'
          onClick={handleFav}
        >
          <HeartIcon
            className={`h-6 w-6 transition-colors duration-300 ${
              isFav ? 'text-red-500 fill-current' : 'text-gray-400'
            } transition-colors duration-300`}
          />
        </button>
      </div>
      <CardContent className='space-y-4 p-6'>
        <h3 className='text-xl font-semibold text-gray-800'>{product.name}</h3>
        <p className='text-gray-600'>{product.description}</p>
        <div className='flex justify-between items-center'>
          <Link to={`/product/${product.id}`}>
            <Button className='px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-300'>
              Ver detalles
            </Button>
          </Link>
        </div>
      </CardContent>
      <Toaster richColors />
    </Card>
  )
}

export default Item
