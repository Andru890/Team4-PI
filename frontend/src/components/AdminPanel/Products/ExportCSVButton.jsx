import { Button } from '@/components/ui/button'
import { json2csv } from 'json-2-csv'
import { toast } from 'sonner'
import { FileSpreadsheetIcon } from '@/components/Icons'

const ExportCSVButton = ({ data }) => {
  const exportToCSV = async () => {
    const formattedData = data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      category: item.category.name,
      categoryDescription: item.category.description,
      characteristics: item.characteristics
        .map((char) => char.characteristic)
        .join(', '),
    }))

    toast.success('Exportando a CSV...')

    try {
      const csv = await json2csv(formattedData)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      link.setAttribute('href', url)
      link.setAttribute('download', 'data.csv')
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
