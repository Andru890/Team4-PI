import { useState } from 'react'
import axios from 'axios'
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

const AddProductDialog = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [characteristic, setCharacteristic] = useState('')
  const [imageUrls, setImageUrls] = useState([])
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { state, handleAddProduct } = useGlobalContext()
  const { dataCategory: categories } = state

  const handleImages = async (e) => {
    const files = e.target.files
    const urls = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'presents_visualstudioservice')

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/wilsondelcanto-dev/image/upload',
        formData
      )

      const data = res.data
      urls.push(data.secure_url)
      console.log(data.secure_url)
      console.log(data.publicId)
    }

    setImageUrls(urls)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const selectedCategory = categories.find((cat) => cat.name === category)
      handleAddProduct({
        name,
        description,
        price: parseFloat(price),
        characteristic,
        image: imageUrls,
        category: selectedCategory,
        stock: parseInt(stock, 10),
      })
      toast.success('Producto agregado con éxito')
      setName('')
      setDescription('')
      setPrice('')
      setCharacteristic('')
      setImageUrls([])
      setCategory('')
      setStock('')
      setIsOpen(false)
    } catch (error) {
      console.error('Error al agregar el producto:', error)
      toast.error('Error al agregar el producto')
    }
  }

  const handleDeleteImages = () => {
    setImageUrls([])
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
                onChange={handleImages}
                placeholder='Selecciona las imágenes para el producto'
                aria-label=''
              />
              {imageUrls.map((url, index) => (
                <div key={index} className='grid grid-cols-4 gap-2'>
                  <img
                    src={url}
                    className='w-20 h-20 object-cover'
                    alt={`Vista previa ${index + 1}`}
                  />
                </div>
              ))}
              {imageUrls.length > 0 && (
                <button onClick={handleDeleteImages}>Eliminar imágenes</button>
              )}
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
