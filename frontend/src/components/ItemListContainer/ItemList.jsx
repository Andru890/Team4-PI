import React from 'react'
import Item from '@/components/ItemListContainer/Item'

const ItemList = ({ productList }) => {
  let shuffledProducts = [...productList]
  shuffledProducts.sort(() => Math.random() - 0.5)
  let randomTenProducts = shuffledProducts.slice(0, 10)

  return (
    <>
      {randomTenProducts.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </>
  )
}

export default ItemList
