import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from '@/components/ItemListContainer/ItemList'
import UseLoader from '@/hooks/useLoader'
import products from '@/data/products'

import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  Pagination,
} from '@/components/ui/pagination'

const ItemListContainer = () => {
  const [productList, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const { categoryId, offerId } = useParams()

  useEffect(() => {
    const getProducts = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(products)
      }, 2000)
    })

    getProducts
      .then((response) => {
        categoryId
          ? setProducts(
              response.filter((product) => product.category === categoryId)
            )
          : setProducts(response)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [categoryId, offerId])

  // Get current products
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <section className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6'>
        <div className='grid gap-4'>
          <h2 className='text-3xl font-bold tracking-tighter'>
            Productos destacados
          </h2>
          <p className='text-gray-500 dark:text-gray-400 '>
            Descubre nuestros productos más populares.
          </p>
        </div>
        <div />
      </div>
      <div className='container grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 mt-5'>
        {isLoading ? <UseLoader /> : <ItemList productList={currentProducts} />}
      </div>
      <div className='container flex justify-center mt-8'>
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href='#'
                  onClick={() => paginate(currentPage - 1)}
                />
              </PaginationItem>
            )}
            {Array(Math.ceil(productList.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href='#' onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {currentPage < Math.ceil(productList.length / itemsPerPage) && (
              <PaginationItem>
                <PaginationNext
                  href='#'
                  onClick={() => paginate(currentPage + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  )
}

export default ItemListContainer
