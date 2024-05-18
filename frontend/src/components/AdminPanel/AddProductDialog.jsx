import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const AddProductDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='ml-auto' size='sm'>
          Agregar producto
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Agregar nuevo producto</DialogTitle>
        </DialogHeader>
        <CardContent>
          <form className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nombre</Label>
              <Input id='name' placeholder='Nombre del producto' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>Descripción</Label>
              <Textarea
                id='description'
                placeholder='Descripción del producto'
              />
            </div>
            <div className='grid gap-2 md:grid-cols-2 md:gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='price'>Precio</Label>
                <Input
                  id='price'
                  placeholder='Precio del producto'
                  type='number'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='stock'>Stock</Label>
                <Input
                  id='stock'
                  placeholder='Stock del producto'
                  type='number'
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='image'>Imagen</Label>
              <Input id='image' type='file' multiple accept='image/*' />
            </div>
            <Button className='w-full' type='submit'>
              Crear Producto
            </Button>
          </form>
        </CardContent>
      </DialogContent>
    </Dialog>
  )
}

export default AddProductDialog
