import { useState } from 'react'
import axios from 'axios'
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

const AddCategoriesDialog = () => {
  const [imageFile, setImageFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [imageURL, setImageURL] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { handleAddCategory } = useGlobalContext()

  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUD_PRESET

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    try {
      let imageUrl = ''
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('upload_preset', UPLOAD_PRESET)
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        )
        imageUrl = res.data.secure_url
      }
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
    } finally {
      setIsUploading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    setImageURL(URL.createObjectURL(file))
  }

  const handleDeleteImage = () => {
    setImageURL(null)
    setImageFile(null)
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
            <Label htmlFor='name'>Descripción</Label>
            <Input
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Ingresa la descripción de la categoría '
              aria-label=''
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='name'>Imagen</Label>
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
