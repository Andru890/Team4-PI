import { useState } from 'react'
import { useGlobalContext } from '@/context/global.context'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CardContent } from '@/components/ui/card'
import { PlusIcon } from '@/components/Icons'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import useCloudinary from '@/hooks/useCloudinary'

const AddProductDialog = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [characteristic, setCharacteristic] = useState('')
  const [imageFiles, setImageFiles] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { state, handleAddProduct } = useGlobalContext()
  const { dataCategory: categories } = state
  const { uploadImage, isUploading } = useCloudinary()

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(files)
    const urls = files.map((file) => URL.createObjectURL(file))
    setImageUrls(urls)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const selectedCategory = categories.find((cat) => cat.name === category)
      const uploadedImageUrls = await Promise.all(
        imageFiles.map((file) => uploadImage(file))
      )

      handleAddProduct({
        name,
        description,
        price: parseFloat(price),
        characteristic,
        images: uploadedImageUrls,
        category: selectedCategory,
        stock: parseInt(stock, 10),
      })

      toast.success('Producto agregado con éxito')
      setName('')
      setDescription('')
      setPrice('')
      setCharacteristic('')
      setImageFiles([])
      setImageUrls([])
      setCategory('')
      setStock('')
      setIsOpen(false)
    } catch (error) {
      console.error('Error al agregar el producto:', error)
      toast.error('Error al agregar el producto')
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
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Agregar nuevo producto</DialogTitle>
          <DialogDescription>
            Completa el formulario para agregar un nuevo producto a la tienda.
          </DialogDescription>
        </DialogHeader>
        <CardContent>
          <form className='grid gap-4' onSubmit={handleSubmit}>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nombre</Label>
              <Input
                id='name'
                placeholder='Nombre del producto'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>Descripción</Label>
              <Textarea
                id='description'
                placeholder='Descripción del producto'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='characteristic'>Características</Label>
              <Textarea
                id='characteristic'
                placeholder='Características del producto'
                value={characteristic}
                onChange={(e) => setCharacteristic(e.target.value)}
              />
            </div>
            <div className='grid gap-2 md:grid-cols-2 md:gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='price'>Precio</Label>
                <Input
                  id='price'
                  placeholder='Precio del producto'
                  type='number'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='category'>Categoría</Label>
                <select
                  id='category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='border-input bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-md w-full'
                >
                  <option value=''>Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='stock'>Cantidad</Label>
              <Input
                id='stock'
                value={stock}
                placeholder='Cantidad disponible'
                type='number'
                onChange={(e) => setStock(e.target.value)}
              />
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
