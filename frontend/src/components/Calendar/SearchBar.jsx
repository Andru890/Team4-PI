import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '@/routes/routes'
import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/components/Icons'
import { useGlobalContext } from '@/context/global.context'

const AdminHeader = () => {
  const { state } = useGlobalContext()
  const { data: products } = state
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

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

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    )
    setFilteredProducts(filtered.slice(0, 6))
    setShowDropdown(term.length > 0 && filtered.length > 0)
  }

  return (
    <>
      <div className='relative'>
        <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
        <Input
          className='w-full bg-white shadow-none appearance-none pl-8 text-gray-500 lg:rounded-full'
          placeholder='Buscar productos...'
          type='search'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
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
                >
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className='px-4 py-2'>No se encontraron resultados</div>
          )}
        </div>
      )}
    </>
  )
}

export default AdminHeader
