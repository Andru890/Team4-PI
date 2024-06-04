import { Link } from 'react-router-dom'
import classNames from 'classnames'

const Item = ({ product }) => {
  return (
    <div
      className='relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2'
      id='item'
    >
      <Link to={`/product/${product.id}`}>
        <div className='bg-white flex items-center justify-center'>
          <img
            className='object-cover w-full h-64'
            height='300'
            src={product.image ? product.image : '/placeholder.svg'}
            alt={product.name ? product.name : 'Product nuevo'}
            style={{
              aspectRatio: '300/300',
              objectFit: 'scale-down',
            }}
            width='300'
          />
        </div>
        <div className='bg-white p-4 dark:bg-gray-950'>
          <h3 className='py-1 font-bold'>{product.name}</h3>
          <p
            className={classNames('py-1 font-medium', {
              'text-[#65D83D]': product.stock > 0,
              'text-inherit': product.stock <= 0,
            })}
          >
            {product.stock > 0 ? 'Stock Disponible' : 'Stock Agotado'}
          </p>
          <p className='py-1 font-medium'>${product.price}</p>
          {/* <div className='mt-4 w-'>
            <Button className='w-full' size='sm'>
              Ver detalles
            </Button>
          </div> */}
        </div>
      </Link>
    </div>
  )
}
export default Item
