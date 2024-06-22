import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon } from '@/components/Icons'
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
    <form onSubmit={handleSearchSubmit} className='relative flex items-center'>
      <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
      <Input
        className='w-full bg-white shadow-none appearance-none pl-8 text-gray-500 lg:rounded-full'
        placeholder='Buscar productos...'
        type='search'
        value={searchTerm}
        onChange={handleSearch}
      />
      <Input
        className='w-full bg-white shadow-none appearance-none pl-8 text-gray-500 lg:rounded-full'
        placeholder='Input 2'
        type='text'
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
      />
      <Input
        className='w-full bg-white shadow-none appearance-none pl-8 text-gray-500 lg:rounded-full'
        placeholder='Input 3'
        type='text'
        value={input3}
        onChange={(e) => setInput3(e.target.value)}
      />
      <button
        type='submit'
        className={`btn ${isSearchButtonDisabled ? 'btn-disabled' : ''}`}
        disabled={isSearchButtonDisabled}
      >
        Buscar
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className='absolute z-10 ml-5 mt-10 bg-white shadow-lg rounded-md dark:bg-gray-800 lg:rounded-lg max-h-60 overflow-y-auto'
        >
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
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
