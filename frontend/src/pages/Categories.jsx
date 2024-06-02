import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '@/context/global.context'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpDownIcon } from '@/components/Icons'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const Categories = () => {
  const { state } = useGlobalContext()
  const { data: products, dataCategory: categories } = state

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'id', order: 'asc' })
  const [filters, setFilteredProducts] = useState({
    status: [],
    customer: [],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const searchValue = search.toLowerCase()

        return (
          String(product.id).toLowerCase().includes(searchValue) ||
          product.name.toLowerCase().includes(searchValue) ||
          product.description.toLowerCase().includes(searchValue) ||
          product.price.toString().toLowerCase().includes(searchValue) ||
          product.status.toLowerCase().includes(searchValue) ||
          product.category.toLowerCase().includes(searchValue)
        )
      })
      .filter((product) => {
        if (
          filters.status.length > 0 &&
          !filters.status.includes(product.status)
        ) {
          return false
        }
        if (
          filters.customer.length > 0 &&
          !filters.customer.includes(product.category)
        ) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        if (sort.order === 'asc') {
          return a[sort.key] > b[sort.key] ? 1 : -1
        } else {
          return a[sort.key] < b[sort.key] ? 1 : -1
        }
      })
  }, [search, sort, filters, products])

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage])

  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === 'asc' ? 'desc' : 'asc' })
    } else {
      setSort({ key, order: 'asc' })
    }
  }

  function handleFilterChange(filterType, filterValue) {
    setFilteredProducts((prevFilters) => {
      if (prevFilters[filterType].includes(filterValue)) {
        return {
          ...prevFilters,
          [filterType]: prevFilters[filterType].filter(
            (value) => value !== filterValue
          ),
        }
      } else {
        return {
          ...prevFilters,
          [filterType]: [...prevFilters[filterType], filterValue],
        }
      }
    })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Header />
      <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
        <div className='bg-white dark:bg-gray-950 rounded-lg shadow-sm p-4 md:p-6'>
          <h2 className='text-lg font-semibold mb-4'>Filtros</h2>
          <div className='flex flex-col gap-4'>
            <fieldset>
              <legend className='font-semibold mb-2 text-sm'>Estado</legend>
              <div className='grid gap-2'>
                <div className='flex gap-2 items-center'>
                  <Checkbox
                    checked={filters.status.includes('En Stock')}
                    onCheckedChange={() =>
                      handleFilterChange('status', 'En Stock')
                    }
                  />
                  <Label htmlFor='status-in-stock' className='font-normal'>
                    En Stock
                  </Label>
                </div>
                <div className='flex gap-2 items-center'>
                  <Checkbox
                    checked={filters.status.includes('Sin Stock')}
                    onCheckedChange={() =>
                      handleFilterChange('status', 'Sin Stock')
                    }
                  />
                  <Label htmlFor='status-out-of-stock' className='font-normal'>
                    Agotado
                  </Label>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className='font-semibold mb-2 text-sm'>Categoría</legend>
              <div className='grid gap-2'>
                {categories.map((category) => (
                  <div key={category.id} className='flex gap-2 items-center'>
                    <Checkbox
                      checked={filters.customer.includes(category.name)}
                      onCheckedChange={() =>
                        handleFilterChange('customer', category.name)
                      }
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className='font-normal'
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <Input
              placeholder='Buscar productos...'
              className='bg-white dark:bg-gray-950'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='shrink-0'>
                  <ArrowUpDownIcon className='w-4 h-4 mr-2' />
                  Ordenar por
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[200px]' align='end'>
                <DropdownMenuRadioGroup
                  value={sort.key}
                  onValueChange={handleSort}
                >
                  <DropdownMenuRadioItem value='id'>
                    Producto #
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='name'>
                    Nombre
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='price'>
                    Precio
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='status'>
                    Estado
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='category'>
                    Categoría
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='mt-20'>
            {filteredProducts.length === 0 ? (
              <div className='text-center'>
                No se encontraron productos que coincidan con los criterios de
                búsqueda.
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {paginatedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className='relative group overflow-hidden'
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className='absolute inset-0 z-10'
                    >
                      <span className='sr-only'>Ver producto</span>
                    </Link>
                    <img
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className='object-contain w-full h-48'
                    />
                    <CardContent className='p-4'>
                      <h3 className='font-semibold text-lg'>{product.name}</h3>
                      {/* <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {product.description}
                      </p> */}
                      <div className='flex items-center justify-between mt-2'>
                        <div className='font-semibold'>${product.price}</div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.stock >= 1
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                        >
                          {product.stock >= 1 ? 'En Stock' : 'Agotado'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div className='flex justify-center mt-4'>
            {Array.from({
              length: Math.ceil(filteredProducts.length / itemsPerPage),
            }).map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? 'solid' : 'outline'}
                onClick={() => handlePageChange(index + 1)}
                className='mx-1'
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Categories
