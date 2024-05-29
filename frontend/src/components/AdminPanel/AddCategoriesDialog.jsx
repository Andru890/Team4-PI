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
import { toast } from 'sonner'

const AddCategoriesDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const { handleAddCategory } = useGlobalContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      handleAddCategory({ name })
      toast.success('Categoría agregada con éxito')
      setName('')
      setIsOpen(false)
    } catch (error) {
      console.error(error)
      toast.error('Error al agregar la categoría')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='ml-auto' size='sm'>
          Agregar categoría
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
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Ingresa la descripción de la categoría '
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
