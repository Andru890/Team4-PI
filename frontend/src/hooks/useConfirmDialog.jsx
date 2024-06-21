import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isQuantityDialogOpen, setIsQuantityDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [quantity, setQuantity] = useState('')
  const [confirmCallback, setConfirmCallback] = useState(null)
  const [error, setError] = useState('')

  const openDialog = (item, onConfirm) => {
    setSelectedItem(item)
    setConfirmCallback(() => onConfirm)
    if (item.stock > 1) {
      setIsQuantityDialogOpen(true)
    } else {
      setIsOpen(true)
    }
  }

  const closeDialog = () => {
    setIsOpen(false)
    setIsQuantityDialogOpen(false)
    setSelectedItem(null)
    setQuantity('')
    setError('')
    setConfirmCallback(null)
  }

  const handleQuantityChange = (e) => {
    const value = e.target.value
    if (isNaN(value) || value < 1 || value > selectedItem.stock) {
      setError(`La cantidad debe estar entre 1 y ${selectedItem.stock}`)
    } else {
      setError('')
    }
    setQuantity(value)
  }

  const ConfirmDialog = ({ title, description }) => (
    <AlertDialog open={isOpen} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              confirmCallback(selectedItem, quantity)
              closeDialog()
            }}
          >
            Sí, bórralo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  const QuantityDialog = () => (
    <AlertDialog open={isQuantityDialogOpen} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Cuántas unidades deseas eliminar?
          </AlertDialogTitle>
          <AlertDialogDescription>
            El producto {selectedItem?.name} tiene un stock de{' '}
            {selectedItem?.stock} unidades.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <input
            type='number'
            value={quantity}
            onChange={handleQuantityChange}
            min='1'
            max={selectedItem?.stock}
            className='border rounded-md p-2 w-full'
            placeholder='Ingresa la cantidad a eliminar'
          />
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <AlertDialogCancel onClick={closeDialog}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (!error && quantity > 0 && quantity <= selectedItem.stock) {
                setIsQuantityDialogOpen(false)
                setIsOpen(true)
              }
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { openDialog, ConfirmDialog, QuantityDialog }
}

export default useConfirmDialog
