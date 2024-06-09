import { Link } from 'react-router-dom'
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogContent,
  Dialog,
} from '@/components/ui/dialog'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'

const ItemDetail = ({ product }) => {
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
              href='#'
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
          <div>
            <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
            <p className='text-gray-500 dark:text-gray-400 mb-8'>
              {product.description}
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <h2 className='text-xl font-bold mb-2'>Caracteristicas</h2>
                <ul className='list-disc pl-4 text-gray-500 dark:text-gray-400'>
                  <li>
                    {product.characteristic &&
                      product.characteristic
                        .split(',')
                        .map((char, index) => (
                          <li key={index}>{char.trim()}</li>
                        ))}
                  </li>
                </ul>
              </div>
              <div>
                <h2 className='text-xl font-bold mb-2'>Especificaciones</h2>
                <ul className='list-disc pl-4 text-gray-500 dark:text-gray-400'>
                  <li>Size: Medium</li>
                  <li>Color: Black</li>
                  <li>Weight: 2 lbs</li>
                  <li>Dimensions: 10 x 6 x 4 inches</li>
                </ul>
              </div>
            </div>
            <div className='flex items-center gap-4 mb-8 mt-20'>
              <div className='text-2xl font-bold'>${product.price}</div>
              <div className='text-gray-500 dark:text-gray-400'>
                {product.stock > 0 ? 'Stock Disponible' : 'Stock Agotado'}
              </div>
            </div>
          </div>
          <div>
            <img
              alt='Product Image'
              className='w-full h-full object-cover rounded-lg'
              height={400}
              src={product.images[0] ? product.images[0] : '/placeholder.svg'}
              style={{
                aspectRatio: '600/400',
                objectFit: 'contain',
              }}
              width={600}
            />
          </div>
        </div>
      </div>

      <div className='container mx-auto py-12 md:py-16 lg:py-20 bg-white'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Dialog>
            <DialogTrigger asChild>
              <div className='relative rounded-lg overflow-hidden cursor-pointer'>
                <img
                  alt='Main Image'
                  className='w-full h-full object-cover'
                  height={600}
                  src={
                    product.images[1] ? product.images[1] : '/placeholder.svg'
                  }
                  style={{
                    aspectRatio: '800/00',
                    objectFit: 'contain',
                  }}
                  width={800}
                />
              </div>
            </DialogTrigger>
            <DialogContent className='max-w-4xl'>
              <DialogHeader>
                <DialogTitle>Main Image</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <img
                  alt='Main Image'
                  className='w-full h-full object-cover'
                  height={600}
                  src={
                    product.images[1] ? product.images[1] : '/placeholder.svg'
                  }
                  style={{
                    aspectRatio: '800/600',
                    objectFit: 'contain',
                  }}
                  width={400}
                />
              </DialogDescription>
            </DialogContent>
          </Dialog>
          <div className='grid grid-cols-2 grid-rows-2 gap-4'>
            <Dialog>
              <DialogTrigger asChild>
                <div className='relative rounded-lg overflow-hidden cursor-pointer'>
                  <img
                    alt='Image 1'
                    className='w-full h-full object-cover'
                    height={300}
                    src={
                      product.images[2] ? product.images[2] : '/placeholder.svg'
                    }
                    style={{
                      aspectRatio: '400/300',
                      objectFit: 'cover',
                    }}
                    width={400}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className='max-w-2xl'>
                <DialogHeader>
                  <DialogTitle>Image 1</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <img
                    alt='Image 1'
                    className='w-full h-full object-cover'
                    height={300}
                    src={
                      product.images[2] ? product.images[2] : '/placeholder.svg'
                    }
                    style={{
                      aspectRatio: '400/300',
                      objectFit: 'cover',
                    }}
                    width={400}
                  />
                </DialogDescription>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <div className='relative rounded-lg overflow-hidden cursor-pointer'>
                  <img
                    alt='Image 2'
                    className='w-full h-full object-cover'
                    height={300}
                    src={
                      product.images[3] ? product.images[3] : '/placeholder.svg'
                    }
                    style={{
                      aspectRatio: '400/300',
                      objectFit: 'cover',
                    }}
                    width={400}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className='max-w-2xl'>
                <DialogHeader>
                  <DialogTitle>Image 2</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <img
                    alt='Image 2'
                    className='w-full h-full object-cover'
                    height={300}
                    src={
                      product.images[3] ? product.images[3] : '/placeholder.svg'
                    }
                    style={{
                      aspectRatio: '400/300',
                      objectFit: 'cover',
                    }}
                    width={400}
                  />
                </DialogDescription>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <div className='relative rounded-lg overflow-hidden cursor-pointer'>
                  <img
                    alt='Image 3'
                    className='w-full h-full object-cover'
                    height={300}
                    src={
                      product.images[4] ? product.images[4] : '/placeholder.svg'
                    }
                    style={{
                      aspectRatio: '400/300',
                      objectFit: 'cover',
                    }}
                    width={400}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className='max-w-2xl'>
                <DialogHeader>
                  <DialogTitle>Image 3</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <img
                    alt='Image 3'
                    className='w-full h-full object-cover'
                    height={300}
                    src={
                      product.images[4] ? product.images[4] : '/placeholder.svg'
                    }
                    style={{
                      aspectRatio: '400/300',
                      objectFit: 'cover',
                    }}
                    width={400}
                  />
                </DialogDescription>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <div className='relative rounded-lg overflow-hidden cursor-pointer'>
                  <img
                    alt='Image 4'
                    className='w-full h-full object-cover'
                    height={300}
                    src={
                      product.images[5] ? product.images[5] : '/placeholder.svg'
                    }
                    style={{
                      aspectRatio: '400/300',
                      objectFit: 'cover',
                    }}
                    width={400}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className='max-w-2xl'>
                <DialogHeader>
                  <DialogTitle>Image 4</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <img
                    alt='Image 4'
                    className='w-full h-full object-cover'
                    height={300}
                    src={
                      product.images[5] ? product.images[5] : '/placeholder.svg'
                    }
                    style={{
                      aspectRatio: '400/300',
                      objectFit: 'cover',
                    }}
                    width={400}
                  />
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className='flex justify-end'>
          <Link
            className='inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline'
            href='#'
          >
            Ver más
            <ChevronRightIcon className='w-4 h-4' />
          </Link>
        </div>
      </div>
    </>
  )
}

export default ItemDetail
