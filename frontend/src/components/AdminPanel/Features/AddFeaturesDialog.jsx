import { useState } from 'react'
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
  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
    imageFile: null,
    imageURL: null,
  })
  const { handleCreateFeature } = useGlobalContext()
  const { uploadImage, isUploading } = useCloudinary()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const imageUrl = await uploadImage(newFeature.imageFile)
      handleCreateFeature({
        name: newFeature.name,
        description: newFeature.description,
        image: imageUrl,
      })
      toast.success('Característica agregada con éxito')
      setNewFeature({
        name: '',
        description: '',
        imageFile: null,
        imageURL: null,
      })
      setIsOpen(false)
    } catch (error) {
      console.error(error)
      toast.error('Error al agregar la característica')
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setNewFeature({
      ...newFeature,
      imageFile: file,
      imageURL: URL.createObjectURL(file),
    })
  }

  const handleDeleteImage = () => {
    setNewFeature({
      ...newFeature,
      imageFile: null,
      imageURL: null,
    })
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
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-1'>
            <Label htmlFor='name'>Nombre</Label>
            <Input
              id='name'
              value={newFeature.name}
              onChange={(e) =>
                setNewFeature({ ...newFeature, name: e.target.value })
              }
              placeholder='Ingresa el nombre de la característica'
              aria-label=''
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='description'>Descripción</Label>
            <Input
              id='description'
              value={newFeature.description}
              onChange={(e) =>
                setNewFeature({ ...newFeature, description: e.target.value })
              }
              placeholder='Ingresa la descripción de la característica'
              aria-label=''
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
              aria-label=''
            />
            {newFeature.imageURL && (
              <div>
                <img
                  src={newFeature.imageURL}
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
