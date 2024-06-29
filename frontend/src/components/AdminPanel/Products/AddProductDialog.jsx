import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useGlobalContext } from '@/context/global.context'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CardContent } from '@/components/ui/card'
import { PlusIcon } from '@/components/Icons'
import { Badge } from '@/components/ui/badge'
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

const AddProductDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm()
  const [imageFiles, setImageFiles] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const { state, handleAddProduct } = useGlobalContext()
  const { dataCategory: categories, dataFeature: features } = state
  const { uploadImage, isUploading } = useCloudinary()
  const [selectedFeatures, setSelectedFeatures] = useState([])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(files)
    const urls = files.map((file) => URL.createObjectURL(file))
    setImageUrls(urls)
  }

  const handleFeatureChange = (featureId) => {
    setSelectedFeatures((prevSelectedFeatures) => {
      if (prevSelectedFeatures.includes(featureId)) {
        return prevSelectedFeatures.filter((id) => id !== featureId)
      } else {
        return [...prevSelectedFeatures, featureId]
      }
    })
  }

  const onSubmit = async (data) => {
    try {
      const selectedCategory = categories.find(
        (cat) => cat.name === data.category
      )
      const uploadedImageUrls = await Promise.all(
        imageFiles.map((file) => uploadImage(file))
      )

      handleAddProduct({
        ...data,
        price: parseFloat(data.price),
        characteristics: selectedFeatures.map((id) => ({
          id: parseInt(id, 10),
        })),
        images: uploadedImageUrls,
        category: selectedCategory,
        stock: parseInt(data.stock, 10),
      })

      toast.success('Producto agregado con éxito')
      reset()
      setImageFiles([])
      setImageUrls([])
      setSelectedFeatures([])
      setIsOpen(false)
    } catch (error) {
      console.error('Error al agregar el producto:', error)
      toast.error('Error al agregar el producto')
    }
  }

  const descriptionValue = watch('description', '')

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <PlusIcon className='w-4 h-4 mr-2' />
          Agregar
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Agregar nuevo producto</DialogTitle>
          <DialogDescription>
            Completa el formulario para agregar un nuevo producto a la tienda.
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
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <span className='text-red-500 text-sm'>
                  {errors.name.message}
                </span>
              )}
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
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <span className='text-red-500 text-sm'>
                  {errors.description.message}
                </span>
              )}
              <p>Total {descriptionValue.length}/1000 caracteres</p>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='characteristics'>Características</Label>
              <div className='grid gap-2'>
                <Select onValueChange={handleFeatureChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecciona características' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Características</SelectLabel>
                      {features.map((feature) => (
                        <SelectItem key={feature.id} value={String(feature.id)}>
                          {feature.characteristic}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.characteristics && (
                  <span className='text-red-500 text-sm'>
                    {errors.characteristics.message}
                  </span>
                )}
              </div>
              <div className='grid grid-cols-2 gap-2'>
                {selectedFeatures.map((id) => {
                  const feature = features.find(
                    (feature) => feature.id === parseInt(id, 10)
                  )
                  return (
                    <Badge
                      key={id}
                      className='flex items-center justify-between'
                    >
                      {feature.characteristic}
                      <Button
                        variant='ghost'
                        onClick={() => handleFeatureChange(id)}
                      >
                        x
                      </Button>
                    </Badge>
                  )
                })}
              </div>
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
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && (
                  <span className='text-red-500 text-sm'>
                    {errors.price.message}
                  </span>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='category'>Categoría</Label>
                <Controller
                  name='category'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'La categoría es obligatoria' }}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={`w-full ${errors.category ? 'border-red-500' : ''}`}
                      >
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
                {errors.category && (
                  <span className='text-red-500 text-sm'>
                    {errors.category.message}
                  </span>
                )}
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
                className={errors.stock ? 'border-red-500' : ''}
              />
              {errors.stock && (
                <span className='text-red-500 text-sm'>
                  {errors.stock.message}
                </span>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='image'>Imágenes</Label>
              <Input
                id='image'
                type='file'
                accept='image/*'
                multiple
                onChange={handleImageChange}
              />
              {imageUrls.length > 0 && (
                <div className='grid grid-cols-4 gap-2'>
                  {imageUrls.map((url, index) => (
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
              {isUploading ? 'Subiendo imágenes...' : 'Crear Producto'}
            </Button>
          </form>
        </CardContent>
      </DialogContent>
    </Dialog>
  )
}

export default AddProductDialog
