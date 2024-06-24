import {
  DialogTrigger,
  DialogDescription,
  DialogContent,
  Dialog,
} from '@/components/ui/dialog'

const ItemDetailGallery = ({ product }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <Dialog>
        <DialogTrigger asChild>
          <div className='relative rounded-lg overflow-hidden cursor-pointer'>
            <img
              alt='Main Image'
              className='w-full h-full object-cover'
              height={600}
              src={product.images[1] ? product.images[1] : '/placeholder.svg'}
              style={{
                aspectRatio: '800/600',
                objectFit: 'contain',
              }}
              width={800}
            />
          </div>
        </DialogTrigger>
        <DialogContent className='max-w-4xl'>
          <DialogDescription>
            <img
              alt='Main Image'
              className='w-full h-full object-cover'
              height={600}
              src={product.images[1] ? product.images[1] : '/placeholder.svg'}
              style={{
                aspectRatio: '800/600',
                objectFit: 'contain',
              }}
              width={800}
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
                src={product.images[2] ? product.images[2] : '/placeholder.svg'}
                style={{
                  aspectRatio: '400/300',
                  objectFit: 'cover',
                }}
                width={400}
              />
            </div>
          </DialogTrigger>
          <DialogContent className='max-w-2xl'>
            <DialogDescription>
              <img
                alt='Image 1'
                className='w-full h-full object-cover'
                height={300}
                src={product.images[2] ? product.images[2] : '/placeholder.svg'}
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
                src={product.images[3] ? product.images[3] : '/placeholder.svg'}
                style={{
                  aspectRatio: '400/300',
                  objectFit: 'cover',
                }}
                width={400}
              />
            </div>
          </DialogTrigger>
          <DialogContent className='max-w-2xl'>
            <DialogDescription>
              <img
                alt='Image 2'
                className='w-full h-full object-cover'
                height={300}
                src={product.images[3] ? product.images[3] : '/placeholder.svg'}
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
                src={product.images[4] ? product.images[4] : '/placeholder.svg'}
                style={{
                  aspectRatio: '400/300',
                  objectFit: 'cover',
                }}
                width={400}
              />
            </div>
          </DialogTrigger>
          <DialogContent className='max-w-2xl'>
            <DialogDescription>
              <img
                alt='Image 3'
                className='w-full h-full object-cover'
                height={300}
                src={product.images[4] ? product.images[4] : '/placeholder.svg'}
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
                src={product.images[5] ? product.images[5] : '/placeholder.svg'}
                style={{
                  aspectRatio: '400/300',
                  objectFit: 'cover',
                }}
                width={400}
              />
            </div>
          </DialogTrigger>
          <DialogContent className='max-w-2xl'>
            <DialogDescription>
              <img
                alt='Image 4'
                className='w-full h-full object-cover'
                height={300}
                src={product.images[5] ? product.images[5] : '/placeholder.svg'}
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
  )
}

export default ItemDetailGallery
