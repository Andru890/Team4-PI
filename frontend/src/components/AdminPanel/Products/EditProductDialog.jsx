import { useState, useEffect } from 'react'
import { useGlobalContext } from '@/context/global.context'
import { toast } from 'sonner'
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
import { PencilIcon } from '@/components/Icons'

const EditProductDialog = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false)

  const [product, setProduct] = useState(null)
  const { state, handleUpdateProduct } = useGlobalContext()
  const { data: products } = state

  useEffect(() => {
    const productToEdit = products.find((p) => p.id === productId)
    setProduct(productToEdit)
  }, [productId, products])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      handleUpdateProduct(product)
      toast.success('Producto actualizado con éxito')
    } catch (error) {
      console.error(error)
      toast.error('Error al actualizar el producto')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <PencilIcon className='h-5 w-5' />
          <span className='sr-only'>Editar</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              type='text'
              value={product?.name || ''}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />

            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={product?.description || ''}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />

            {/* Add more fields as needed... */}

            <Button type='submit'>Save Changes</Button>
          </CardContent>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProductDialog
