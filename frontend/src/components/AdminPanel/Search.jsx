import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/components/Icons'

const AdminHeader = ({ products }) => {
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
    <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-200 px-6 dark:bg-gray-800/40'>
      <div className='w-full flex-1 relative'>
        <form>
          <div className='relative'>
            <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
            <Input
              className='w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950'
              placeholder='Buscar productos...'
              type='search'
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {showDropdown && (
            <div
              ref={dropdownRef}
              className='absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md dark:bg-gray-800'
            >
              {filteredProducts.length > 0 ? (
                <ul>
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className='px-4 py-2'>No se encontraron resultados</div>
              )}
            </div>
          )}
        </form>
      </div>
      {/* ... resto del código ... */}
    </header>
  )
}

export default AdminHeader
