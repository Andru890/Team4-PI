export const deleteProduct = (product, products, setProducts) => {
  const confirmDelete = confirm(
    `¿Estás seguro de que deseas eliminar el producto "${product.name}"?`
  )

  if (confirmDelete) {
    const stockToRemove = prompt(
      `El producto "${product.name}" tiene un stock de ${product.stock} unidades. ¿Cuántas unidades deseas eliminar?`,
      product.stock
    )

    if (stockToRemove !== null && !isNaN(stockToRemove)) {
      const updatedStock = product.stock - parseInt(stockToRemove)

      if (updatedStock === 0) {
        const updatedProducts = products.filter((p) => p.id !== product.id)
        setProducts(updatedProducts)
        alert(`El producto "${product.name}" ha sido eliminado.`)
      } else {
        const updatedProducts = products.map((p) => {
          if (p.id === product.id) {
            return { ...p, stock: updatedStock }
          }
          return p
        })
        setProducts(updatedProducts)
        alert(
          `Se han eliminado ${stockToRemove} unidades del producto "${product.name}". Stock restante: ${updatedStock}.`
        )
      }
    } else {
      alert('Por favor, ingresa una cantidad válida.')
    }
  }
}
