import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { PlusIcon } from '@/components/Icons'
import { Textarea } from '@/components/ui/textarea'

const AddFeaturesDialog = () => {
  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
  })

  const handleSaveFeature = () => {
    console.log(newFeature)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <PlusIcon className='w-4 h-4 mr-2' />
          Agregar Característica
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Agregar Característica</DialogTitle>
          <DialogDescription>
            Completa el formulario para agregar una nueva característica.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid items-center grid-cols-4 gap-4'>
            <Label htmlFor='name' className='text-right'>
              Nombre
            </Label>
            <Input
              id='name'
              value={newFeature.name}
              onChange={(e) =>
                setNewFeature({ ...newFeature, name: e.target.value })
              }
              className='col-span-3'
            />
          </div>
          <div className='grid items-center grid-cols-4 gap-4'>
            <Label htmlFor='description' className='text-right'>
              Descripción
            </Label>
            <Textarea
              id='description'
              value={newFeature.description}
              onChange={(e) =>
                setNewFeature({
                  ...newFeature,
                  description: e.target.value,
                })
              }
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSaveFeature}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddFeaturesDialog
