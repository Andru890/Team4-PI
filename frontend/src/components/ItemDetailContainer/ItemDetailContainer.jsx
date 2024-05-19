import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from '@/components/ItemDetailContainer/ItemDetail'
import UseLoader from '@/hooks/useLoader'

const ItemDetailContainer = () => {
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { itemId } = useParams()

  useEffect(() => {
    setIsLoading(true)

    fetch(`http://localhost:8000/product/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }, [itemId])

  return (
    <div className='mt-20'>
      {isLoading ? <UseLoader /> : <ItemDetail product={product} />}
    </div>
  )
}

export default ItemDetailContainer
