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
  const [urlImg, setUrlImg] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [imageURL, setImageURL] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { handleAddCategory } = useGlobalContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      handleAddCategory({ name, description, image: urlImg })
      toast.success('Categoría agregada con éxito')
      setName('')
      setDescription('')
      setIsOpen(false)
    } catch (error) {
      console.error(error)
      toast.error('Error al agregar la categoría')
    }
  }

  const handleImage = async (e) => {
    setIsUploading(true)
    const file = e.target.files[0]
    setImageURL(URL.createObjectURL(file))
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'presents_visualstudioservice')
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/wilsondelcanto-dev/image/upload',
      formData
    )
    const data = res.data
    setUrlImg(data.secure_url)
    console.log(data.secure_url)
    console.log(data.publicId)
    setIsUploading(false)
  }

  const handleDeleteImage = async () => {
    // Aquí asumimos que tienes el publicId de la imagen almacenado en el estado
    setImageURL(null)
    setUrlImg('')
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
              onChange={handleImage}
              placeholder='Selecciona una imagen para la categoría'
              aria-label=''
            />
            {imageURL && (
              <div>
                <image src={imageURL} alt='Vista previa de la imagen' />
                <button onClick={handleDeleteImage}>Eliminar imagen</button>
              </div>
            )}
          </div>
          <div className='flex justify-end gap-2'>
            <Button type='submit' disabled={isUploading}>
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoriesDialog
