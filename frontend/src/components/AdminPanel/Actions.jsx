import { toast } from 'sonner'
import Swal from 'sweetalert2'

export const deleteProduct = (product, products, setProducts) => {
  Swal.fire({
    title: `¿Estás seguro de que deseas eliminar el producto "${product.name}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `El producto "${product.name}" tiene un stock de ${product.stock} unidades.`,
        input: 'number',
        inputPlaceholder: 'Ingresa la cantidad a eliminar',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value) {
            return 'Por favor, ingresa una cantidad'
          } else if (isNaN(value)) {
            return 'Por favor, ingresa un número válido'
          } else if (value > product.stock) {
            return `La cantidad no puede ser mayor que el stock (${product.stock})`
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const stockToRemove = parseInt(result.value)
          const updatedStock = product.stock - stockToRemove

          if (updatedStock === 0) {
            const updatedProducts = products.filter((p) => p.id !== product.id)
            setProducts(updatedProducts)
            toast(`El producto "${product.name}" ha sido eliminado.`)
          } else {
            const updatedProducts = products.map((p) => {
              if (p.id === product.id) {
                return { ...p, stock: updatedStock }
              }
              return p
            })
            setProducts(updatedProducts)
            toast(
              `Se han eliminado ${stockToRemove} unidades del producto "${product.name}". Stock restante: ${updatedStock}.`
            )
          }
        }
      })
    }
  })
}
