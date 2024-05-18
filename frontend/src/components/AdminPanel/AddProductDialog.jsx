import { useState } from 'react'
import { useGlobalContext } from '@/Context/global.context'
import { addProduct } from '@/services/productsAPI'
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

const categories = [
  { id: 1, name: 'Camaras' },
  { id: 2, name: 'Audio' },
  { id: 3, name: 'Luces' },
  { id: 4, name: 'Accesorios' },
]

const AddProductDialog = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [characteristic, setCharacteristic] = useState('')
  const [imageUrls, setImageUrls] = useState([])
  const [category, setCategory] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { dispatch } = useGlobalContext()

  const handleImageChange = (e) => {
    const files = e.target.files
    const urls = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = () => {
        urls.push(reader.result)
        setImageUrls([...urls])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const selectedCategory = categories.find((cat) => cat.name === category)

      const newProduct = {
        name,
        description,
        price: parseFloat(price),
        characteristic,
        images: imageUrls,
        category: selectedCategory,
      }

      // Llama a la función addProduct desde productsAPI y obtén la respuesta
      const addedProduct = await addProduct(newProduct)

      // Despacha la acción para agregar el nuevo producto al estado global
      dispatch({ type: 'ADD_PRODUCT', payload: addedProduct })

      setIsOpen(false)
    } catch (error) {
      console.error('Error al agregar el producto:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
