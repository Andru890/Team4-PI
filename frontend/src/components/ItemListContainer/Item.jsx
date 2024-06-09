import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Item = ({ product }) => {
  return (
    <div
      className='relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2'
      id='item'
    >
      <div className='bg-white'>
        <img
          className='object-cover w-full h-64'
          height='300'
          src={product.images[0] ? product.images[0] : '/placeholder.svg'}
          alt={product.name ? product.name : 'Product nuevo'}
          style={{
            aspectRatio: '300/300',
            objectFit: 'scale-down',
          }}
          width='300'
        />
      </div>
      <div className='bg-white p-4 dark:bg-gray-950'>
        <h3 className='font-bold text-xl'>{product.name}</h3>
        <p className='text-sm text-gray-500 line-clamp-2'>
          {product.description}
        </p>
        <div className='mt-4'>
          <Link to={`/product/${product.id}`}>
            <Button className='w-full' size='sm'>
              Ver detalles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Item
