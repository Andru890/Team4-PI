import { useNavigate, Link } from 'react-router-dom'

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'
import ItemPolicies from '@/components/ItemDetailContainer/ItemPolicies'
import ItemCalendar from '@/components/ItemDetailContainer/ItemCalendar'
import ItemReviews from '@/components/ItemDetailContainer/ItemReviews'
import { useAuthContext } from '@/context/auth.context'
import { toast } from 'sonner'
import ItemDetailGallery from '@/components/ItemDetailContainer/ItemDetailGallery'
import ItemShare from './ItemShare'

const ItemDetail = ({ product }) => {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')

  const handleReservation = () => {
    if (
      !user ||
      !token ||
      !user.roles ||
      typeof user.roles !== 'object' ||
      Object.keys(user.roles).length === 0
    ) {
      toast.error('Debes iniciar sesión para reservar un producto.')
      navigate('/login', {
        state: { from: `/reservation/${product.id}` },
      })
    } else {
      navigate(`/reservation/${product.id}`)
    }
  }

  const goBack = () => {
    window.history.back()
  }

  return (
    <>
      <header className='w-full bg-gray-100 dark:bg-gray-800 py-4 px-4 md:px-6'>
        <div className='container mx-auto flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Link
              className='text-gray-900 dark:text-gray-50 font-bold text-lg'
              to='#'
            >
              {product.name}
            </Link>
          </div>
          <Link
            className='text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50'
            onClick={goBack}
          >
            <ChevronLeftIcon className='w-5 h-5' />
          </Link>
        </div>
      </header>

      <div className='container mx-auto py-12 md:py-16 lg:py-20 bg-white'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className=''>
            <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
            <p className='text-gray-500 dark:text-gray-400 mb-8 max-w-full break-words'>
              {product.description}
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <h2 className='text-xl font-bold mb-2'>Características</h2>
                <ul className='list-disc pl-4 text-gray-500 dark:text-gray-400'>
                  {product.characteristics &&
                    product.characteristics.map((char, index) => (
                      <li key={index}>{char.characteristic}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div className='flex items-center gap-4 mb-8 mt-20'>
              <div className='text-4xl font-bold'>${product.price}</div>
              <div className='text-green-600 font-bold  dark:text-gray-400'>
                {product.stock > 0 ? 'Stock Disponible' : 'Stock Agotado'}
              </div>
            </div>
            <ItemShare product={product} />
            <ItemCalendar productId={product.id} />
            <button
              className='mt-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out mx-auto block w-full md:w-auto '
              onClick={handleReservation}
            >
              Reservar
            </button>
          </div>
          <div className='grid align-top grid-cols-1 gap-9'>
            <div>
              <img
                alt='Product Image'
                className='w-full h-full object-cover rounded-lg'
                src={product.images[0] ? product.images[0] : '/placeholder.svg'}
                style={{
                  aspectRatio: '600/400',
                  objectFit: 'contain',
                }}
              />
            </div>
            <div>
              <ItemReviews productId={product.id} />
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto py-12 md:py-16 lg:py-20 bg-white'>
        <ItemDetailGallery product={product} />
        <div className='flex justify-end'>
          <Link
            className='inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline'
            to='#'
          >
            Ver más
            <ChevronRightIcon className='w-4 h-4' />
          </Link>
        </div>
        <ItemPolicies />
      </div>
    </>
  )
}

export default ItemDetail
