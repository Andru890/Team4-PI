// src/components/AddCategoriesDialog.js
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
import { toast } from 'sonner'
import useCloudinary from '@/hooks/useCloudinary'

const AddCategoriesDialog = () => {
  const [imageFile, setImageFile] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { handleAddCategory } = useGlobalContext()
  const { uploadImage, isUploading } = useCloudinary()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const imageUrl = await uploadImage(imageFile)
      handleAddCategory({ name, description, image: imageUrl })
      toast.success('Categoría agregada con éxito')
      setName('')
      setDescription('')
      setImageFile(null)
      setImageURL(null)
      setIsOpen(false)
    } catch (error) {
      console.error(error)
      toast.error('Error al agregar la categoría')
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    setImageURL(URL.createObjectURL(file))
  }

  const handleDeleteImage = () => {
    setImageURL('')
    setImageFile('')
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
          <DialogTitle>Agregar nueva categoría</DialogTitle>
          <DialogDescription>
            Ingresa el nombre de la nueva categoría que deseas agregar.
          </DialogDescription>
        </DialogHeader>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-1'>
            <Label htmlFor='name'>Nombre</Label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Ingresa el nombre de la categoría'
              aria-label=''
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='description'>Descripción</Label>
            <Input
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Ingresa la descripción de la categoría '
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
              placeholder='Selecciona una imagen para la categoría'
              aria-label=''
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

export default AddCategoriesDialog
