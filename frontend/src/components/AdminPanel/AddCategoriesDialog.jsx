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

const AddCategoriesDialog = () => {
  return (
    <Dialog defaultOpen>
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
        <form className='space-y-4'>
          <div className='space-y-1'>
            <Label htmlFor='name'>Nombre</Label>
            <Input
              id='name'
              placeholder='Ingresa el nombre de la categoría'
              aria-label=''
            />
          </div>
          <div className='flex justify-end gap-2'>
            <div>
              <Button variant='outline'>Cancelar</Button>
            </div>
            <Button type='submit'>Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoriesDialog
