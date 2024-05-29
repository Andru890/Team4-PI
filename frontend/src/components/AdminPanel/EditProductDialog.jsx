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
  DialogDescription,
} from '@/components/ui/dialog'

const EditProductDialog = ({ productId }) => {
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
    <Dialog>
      <DialogTrigger as={Button}>Edit</DialogTrigger>
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
