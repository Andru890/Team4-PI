import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useGlobalContext } from '@/context/global.context'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PlusIcon } from '@/components/Icons'
import { toast } from 'sonner'
import useCloudinary from '@/hooks/useCloudinary'

const AddFeaturesDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const { handleCreateFeature } = useGlobalContext()
  const { uploadImage, isUploading } = useCloudinary()
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      const imageUrl = await uploadImage(imageFile)
      handleCreateFeature({
        characteristic: data.name,
        imageUrl: imageUrl,
      })
      toast.success('Característica agregada con éxito')
      reset()
      setImageFile(null)
      setImageURL(null)
      setIsOpen(false)
    } catch (error) {
      console.error(error)
      toast.error('Error al agregar la característica')
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    setImageURL(URL.createObjectURL(file))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setImageFile(file)
    setImageURL(URL.createObjectURL(file))
  }

  const handleDeleteImage = () => {
    setImageFile(null)
    setImageURL(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <PlusIcon className='w-4 h-4 mr-2' />
          Agregar
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Agregar nueva característica</DialogTitle>
          <DialogDescription>
            Ingresa el nombre y la imagen de la nueva característica que deseas
            agregar.
          </DialogDescription>
        </DialogHeader>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-1'>
            <Label htmlFor='name'>Nombre</Label>
            <Input
              id='name'
              {...register('name', { required: true })}
              placeholder='Ingresa el nombre de la característica'
              aria-label='Nombre de la característica'
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='image'>Imagen</Label>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('image').click()}
              className='border-2 border-dashed border-primary rounded-lg p-8 flex flex-col items-center justify-center h-64 cursor-pointer relative'
            >
              {imageURL === null && (
                <>
                  <UploadIcon className='w-12 h-12 text-primary' />
                  <p className='text-primary font-semibold'>
                    Arrastra y suelta una imagen aquí
                  </p>
                  <p className='text-muted-foreground'>
                    o haz clic para seleccionar un archivo
                  </p>
                </>
              )}
              <input
                id='image'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
              {imageURL && (
                <div
                  className='absolute inset-0 grid grid-cols-1 gap-2 p-2 overflow-auto'
                  style={{ maxHeight: '100%' }}
                >
                  <div
                    className='relative'
                    style={{
                      width: '100%',
                      paddingBottom: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      type='button'
                      onClick={handleDeleteImage}
                      className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10'
                    >
                      x
                    </button>
                    <div className='border rounded-lg overflow-hidden absolute inset-0'>
                      <img
                        src={imageURL}
                        alt='Imagen previa'
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <Button type='submit' disabled={isUploading}>
              {isUploading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
      <polyline points='17 8 12 3 7 8' />
      <line x1='12' y1='3' x2='12' y2='15' />
    </svg>
  )
}

export default AddFeaturesDialog
