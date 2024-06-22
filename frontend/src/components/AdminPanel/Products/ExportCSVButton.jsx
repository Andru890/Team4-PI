import { Button } from '@/components/ui/button'
import { json2csv } from 'json-2-csv'
import { toast } from 'sonner'
import { FileSpreadsheetIcon } from '@/components/Icons'

const ExportCSVButton = ({ data }) => {
  const exportToCSV = async () => {
    if (data.length === 0) {
      toast.error('No hay productos para exportar')
      return
    }

    const formattedData = data.map((item) => {
      // Agrega un log para depurar
      console.log('Categoría actual:', item.categories)

      return {
        id: item.id ? item.id : 'Sin ID',
        nombre: item.name ? item.name : 'Sin nombre',
        descripción: item.description ? item.description : 'Sin descripción',
        precio: item.price ? item.price : 'Sin precio',
        cantidad: item.stock ? item.stock : 'Sin stock',
        categoria: item.category ? item.category.name : 'Sin categoria',
        características: item.characteristics
          .map((char) => char.characteristic)
          .join(', '),
      }
    })

    toast.success('Exportando a CSV...')

    try {
      const csv = await json2csv(formattedData)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      const currentDate = new Date()
      const formattedDate = currentDate.toISOString().split('T')[0] // YYYY-MM-DD format

      const fileName = `data_${formattedDate}.csv`

      link.setAttribute('href', url)
      link.setAttribute('download', fileName)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Error converting JSON to CSV:', err)
    }
  }

  return (
    <Button onClick={exportToCSV} className='bg-[#107c41] text-white'>
      Exportar a CSV
      <FileSpreadsheetIcon className='ml-2' />
    </Button>
  )
}

export default ExportCSVButton
