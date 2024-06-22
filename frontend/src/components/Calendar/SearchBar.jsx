import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon } from '@/components/Icons' // Asegúrate de tener el ícono de la lupa importado correctamente
import { Input } from '@/components/ui/input'
import { useGlobalContext } from '@/context/global.context'
import { toast } from 'sonner'

const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

const AdminHeader = () => {
  const { state } = useGlobalContext()
  const { data: products } = state
  const [searchTerm, setSearchTerm] = useState('')
  const [input2, setInput2] = useState('')
  const [input3, setInput3] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const debouncedSearch = useCallback(
    debounce((term) => {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().startsWith(term) ||
          product.description.toLowerCase().startsWith(term)
      )
      setFilteredProducts(filtered.slice(0, 6))
      setShowDropdown(term.length > 0 && filtered.length > 0)

      if (term.length > 0 && filtered.length === 0) {
        toast.error('No se encontraron resultados')
      }
    }, 500),
    [products]
  )

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    debouncedSearch(term)
  }

  const handleProductClick = (productName) => {
    setSearchTerm(productName)
    setShowDropdown(false)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const product = products.find(
      (product) => product.name.toLowerCase() === searchTerm.toLowerCase()
    )

    if (product) {
      navigate(`/product/${product.id}`)
    } else {
      toast.error('Producto no encontrado')
    }
  }

  const isSearchButtonDisabled = !searchTerm || !input2 || !input3

  return (
    <form
      onSubmit={handleSearchSubmit}
      className='relative flex items-center bg-gray-100 p-4 rounded-full shadow-md max-w-4xl mx-auto mt-8'
    >
      <div className='relative w-full'>
        <label className='block text-gray-500 text-sm font-semibold mb-1'>
          Dónde
        </label>
        <Input
          className='pl-4 pr-4 py-2 w-full rounded-full border-none bg-transparent focus:outline-none'
          placeholder='Explora destinos'
          type='search'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className='relative w-full mx-2'>
        <label className='block text-gray-500 text-sm font-semibold mb-1'>
          Llegada
        </label>
        <Input
          className='pl-4 pr-4 py-2 w-full rounded-full border-none bg-transparent focus:outline-none'
          placeholder='Agrega fecha...'
          type='date'
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <div className='relative w-full'>
        <label className='block text-gray-500 text-sm font-semibold mb-1'>
          Salida
        </label>
        <Input
          className='pl-4 pr-4 py-2 w-full rounded-full border-none bg-transparent focus:outline-none'
          placeholder='Agrega fecha...'
          type='date'
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
        />
      </div>
      <div className='relative w-full mx-2'>
        <label className='block text-gray-500 text-sm font-semibold mb-1'>
          Quién
        </label>
        <Input
          className='pl-4 pr-4 py-2 w-full rounded-full border-none bg-transparent focus:outline-none'
          placeholder='¿Cuántos?'
          type='text'
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
        />
      </div>
      <button
        type='submit'
        className={`ml-2 px-6 py-2 rounded-full text-white flex items-center ${isSearchButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600'}`}
        disabled={isSearchButtonDisabled}
      >
        <SearchIcon className='h-5 w-5 mr-2' />
        Buscar
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className='absolute z-10 top-full mt-2 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto'
        >
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => handleProductClick(product.name)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </form>
  )
}

export default AdminHeader
