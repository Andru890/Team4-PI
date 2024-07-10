import { useState, useEffect } from 'react'
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
import { toast } from 'sonner'
import useCloudinary from '@/hooks/useCloudinary'

const EditFeaturesDialog = ({ featureId, isOpen, setIsOpen }) => {
  const [imageFile, setImageFile] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const { handleUpdateFeature, state } = useGlobalContext()
  const { uploadImage, isUploading } = useCloudinary()
  const { register, handleSubmit, reset, setValue } = useForm()

  useEffect(() => {
    if (featureId && isOpen) {
      const feature = state.dataFeature.find((f) => f.id === featureId)
      if (feature) {
        setValue('name', feature.characteristic)
        setImageURL(feature.imageUrl)
      }
    }
  }, [featureId, isOpen, setValue, state.dataFeature])

  const onSubmit = async (data) => {
    try {
      let imageUrl = imageURL
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }
      await handleUpdateFeature({
        id: featureId,
        characteristic: data.name,
        imageUrl: imageUrl,
      })
      toast.success('Característica actualizada con éxito')
      reset()
      setImageFile(null)
      setImageURL(null)
      setIsOpen(false)
    } catch (error) {
      console.error(error)
      toast.error('Error al actualizar la característica')
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
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Editar característica</DialogTitle>
          <DialogDescription>
            Edita el nombre y la imagen de la característica seleccionada.
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

export default EditFeaturesDialog
