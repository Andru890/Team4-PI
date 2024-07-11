import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from '@/components/ItemListContainer/ItemList'
import UseLoader from '@/hooks/useLoader'
import { useGlobalContext } from '@/context/global.context'

import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  Pagination,
} from '@/components/ui/pagination'

const ItemListContainer = () => {
  const { state } = useGlobalContext()
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const { categoryId, offerId } = useParams()

  useEffect(() => {
    setIsLoading(false)
  }, [categoryId, offerId])

  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = state.data.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <section className='w-full py-12 md:py-24 lg:py-32'>
      <div className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6'>
        <div className='grid gap-4'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-3xl md:text-3xl'>
            Productos destacados
          </h2>
          <p className='max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
            Descubre nuestros productos más populares.
          </p>
        </div>
        <div />
      </div>
      <div className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 mt-5'>
        {isLoading ? <UseLoader /> : <ItemList productList={currentProducts} />}
      </div>
      <div className='max-w-screen-xl mx-auto flex justify-center mt-8'>
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
            {Array(Math.ceil(state.data.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {currentPage < Math.ceil(state.data.length / itemsPerPage) && (
              <PaginationItem>
                <PaginationNext onClick={() => paginate(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  )
}

export default ItemListContainer
