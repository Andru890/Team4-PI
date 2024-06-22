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
import useCloudinary from '@/hooks/useCloudinary'
import { toast } from 'sonner'

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
        name: data.name,
        image: imageUrl,
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
            Ingresa el nombre y la descripción de la nueva característica que
            deseas agregar.
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
            <Input
              id='image'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              placeholder='Selecciona una imagen para la característica'
              aria-label='Imagen de la característica'
            />
            {imageURL && (
              <div>
                <img
                  src={imageURL}
                  alt='Vista previa de la imagen'
                  className='w-32 h-32 object-cover mt-2'
                />
                <button type='button' onClick={handleDeleteImage}>
                  Eliminar imagen
                </button>
              </div>
            )}
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

export default AddFeaturesDialog
