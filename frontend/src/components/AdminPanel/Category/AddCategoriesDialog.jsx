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

const AddCategoriesDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const { handleAddCategory } = useGlobalContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      handleAddCategory({ name, description, image })
      toast.success('Categoría agregada con éxito')
      setName('')
      setDescription('')
      setImage('')
      setIsOpen(false)
    } catch (error) {
      console.error(error)
      toast.error('Error al agregar la categoría')
    }
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
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder='Ingresa la url de la imagen'
              aria-label=''
            />
          </div>
          <div className='flex justify-end gap-2'>
            <Button type='submit'>Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoriesDialog
