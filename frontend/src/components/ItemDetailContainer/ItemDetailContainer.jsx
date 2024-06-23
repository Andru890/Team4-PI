import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from '@/components/ItemDetailContainer/ItemDetail'
import UseLoader from '@/hooks/useLoader'
import { useGlobalContext } from '@/context/global.context'

const ItemDetailContainer = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { itemId } = useParams()
  const { state, handleGetProductById } = useGlobalContext()
  const { productSelected } = state

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      await handleGetProductById(itemId)
      setIsLoading(false)
    }
    fetchProduct()
  }, [itemId, handleGetProductById])

  return (
    <div className='mt-20' id='detail'>
      {isLoading ? <UseLoader /> : <ItemDetail product={productSelected} />}
    </div>
  )
}

export default ItemDetailContainer
