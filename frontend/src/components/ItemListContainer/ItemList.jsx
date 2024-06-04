import Item from '@/components/ItemListContainer/Item'

const ItemList = ({ productList }) => {
  let shuffledProducts = [...productList]
  shuffledProducts.sort(() => Math.random() - 0.5)
  let randomSixProducts = shuffledProducts.slice(0, 6)

  return (
    <>
      {randomSixProducts.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </>
  )
}

export default ItemList
