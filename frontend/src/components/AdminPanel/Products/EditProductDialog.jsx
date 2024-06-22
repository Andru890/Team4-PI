import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useGlobalContext } from '@/context/global.context'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CardContent } from '@/components/ui/card'
import { PencilIcon } from '@/components/Icons'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import useCloudinary from '@/hooks/useCloudinary'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const EditProductDialog = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState(null)
  const { register, handleSubmit, setValue, reset, control, watch } = useForm()
  const { state, handleUpdateProduct } = useGlobalContext()
  const { data: products, dataCategory: categories } = state
  const { uploadImage, isUploading } = useCloudinary()

  useEffect(() => {
    const productToEdit = products.find((p) => p.id === productId)
    if (productToEdit) {
      setProduct(productToEdit)
      setValue('name', productToEdit.name || '')
      setValue('description', productToEdit.description || '')
      setValue('price', productToEdit.price || 0)
      setValue('stock', productToEdit.stock || 0)
      setValue('category', productToEdit.category?.name || '')
      setValue(
        'characteristics',
        productToEdit.characteristics?.map((char) => char.characteristic) || []
      )
      setValue('images', productToEdit.images || [])
    }
  }, [productId, products, setValue])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    const urls = files.map((file) => URL.createObjectURL(file))
    setProduct((prev) => ({ ...prev, images: [...prev.images, ...urls] }))
    setValue('images', [...product.images, ...files])
  }

  const onSubmit = async (data) => {
    try {
      const selectedCategory = categories.find(
        (cat) => cat.name === data.category
      )
      const uploadedImageUrls = await Promise.all(
        (data.images || []).map((file) => uploadImage(file))
      )

      const updatedProduct = {
        ...product,
        ...data,
        price: parseFloat(data.price),
        stock: parseInt(data.stock, 10),
        images: uploadedImageUrls.length ? uploadedImageUrls : product.images,
        category: selectedCategory,
        characteristics: data.characteristics.map((char) => ({
          characteristic: char,
        })),
      }

      await handleUpdateProduct(updatedProduct)
      toast.success('Producto actualizado con éxito')
      setIsOpen(false)
    } catch (error) {
      console.error('Error al actualizar el producto:', error)
      toast.error('Error al actualizar el producto')
    }
  }

  const descriptionValue = watch('description', '')

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <PencilIcon className='h-5 w-5' />
          <span className='sr-only'>Editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>
            Modifica los detalles del producto.
          </DialogDescription>
        </DialogHeader>
        <CardContent>
          <form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nombre</Label>
              <Input
                id='name'
                placeholder='Nombre del producto'
                {...register('name', { required: 'El nombre es obligatorio' })}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>Descripción</Label>
              <Textarea
                id='description'
                placeholder='Descripción del producto'
                {...register('description', {
                  required: 'La descripción es obligatoria',
                  maxLength: {
                    value: 1000,
                    message:
                      'La descripción no puede superar los 1000 caracteres',
                  },
                })}
              />
              <p>Total {descriptionValue.length}/1000 caracteres</p>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='characteristics'>Características</Label>
              <Controller
                name='characteristics'
                control={control}
                render={({ field }) => (
                  <Textarea
                    id='characteristics'
                    placeholder='Características del producto'
                    {...field}
                  />
                )}
              />
            </div>
            <div className='grid gap-2 md:grid-cols-2 md:gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='price'>Precio</Label>
                <Input
                  id='price'
                  placeholder='Precio del producto'
                  type='number'
                  {...register('price', {
                    required: 'El precio es obligatorio',
                  })}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='category'>Categoría</Label>
                <Controller
                  name='category'
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona una categoría' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categorías</SelectLabel>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.name}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='stock'>Cantidad</Label>
              <Input
                id='stock'
                placeholder='Cantidad disponible'
                type='number'
                {...register('stock', {
                  required: 'La cantidad es obligatoria',
                })}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='images'>Imágenes</Label>
              <Input
                id='images'
                type='file'
                accept='image/*'
                multiple
                onChange={handleImageChange}
              />
              {product?.images && (
                <div className='grid grid-cols-4 gap-2'>
                  {product.images.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Imagen previa ${index + 1}`}
                      className='w-20 h-20 object-cover'
                    />
                  ))}
                </div>
              )}
            </div>
            <Button className='w-full' type='submit' disabled={isUploading}>
              {isUploading ? 'Subiendo imágenes...' : 'Guardar cambios'}
            </Button>
          </form>
        </CardContent>
      </DialogContent>
    </Dialog>
  )
}

export default EditProductDialog
