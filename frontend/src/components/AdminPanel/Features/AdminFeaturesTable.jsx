import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

import {
  SearchIcon,
  ArrowUpDownIcon,
  FilterIcon,
  ComponentIcon,
  DeleteIcon,
  Trash2Icon,
} from '@/components/Icons'
import AdminFeatureDialog from '@/components/AdminPanel/Features/AddFeaturesDialog'

const AdminFeaturesTable = () => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'id', order: 'asc' })
  const [filters, setFilters] = useState({
    customer: [],
  })
  const features = useMemo(
    () =>
      [
        {
          id: 'FEAT001',
          name: 'Alta Resolución',
          description: 'Imágenes de alta calidad con resolución 4K.',
          icon: 'ResoluciónAlta',
        },
        {
          id: 'FEAT002',
          name: 'Zoom Óptico',
          description: 'Aproxímate a los detalles sin perder calidad.',
          icon: 'ZoomÓptico',
        },
        {
          id: 'FEAT003',
          name: 'Reducción de Ruido',
          description: 'Capta sonido claro y sin interferencias.',
          icon: 'ReducciónRuido',
        },
        {
          id: 'FEAT004',
          name: 'Iluminación LED',
          description:
            'Luces de estudio LED con ajuste de temperatura de color.',
          icon: 'LED',
        },
        {
          id: 'FEAT005',
          name: 'Estabilizador de Imagen',
          description: 'Imágenes y videos sin movimiento borroso.',
          icon: 'Estabilizador',
        },
        {
          id: 'FEAT006',
          name: 'Micrófono Inalámbrico',
          description: 'Mayor movilidad y calidad de sonido sin cables.',
          icon: 'Micrófono',
        },
        {
          id: 'FEAT007',
          name: 'Control Remoto',
          description: 'Maneja tu equipo a distancia con un control remoto.',
          icon: 'ControlRemoto',
        },
        {
          id: 'FEAT008',
          name: 'Autofoco Rápido',
          description: 'Enfoca rápidamente para no perder ningún detalle.',
          icon: 'Autofoco',
        },
        {
          id: 'FEAT009',
          name: 'Batería de Larga Duración',
          description: 'Horas de uso continuo sin necesidad de recargar.',
          icon: 'Batería',
        },
        {
          id: 'FEAT010',
          name: 'Soporte para Trípode',
          description: 'Compatibilidad con diversos tipos de trípodes.',
          icon: 'Trípode',
        },
        {
          id: 'FEAT011',
          name: 'Grabación en Cámara Lenta',
          description: 'Captura videos en cámara lenta con alta calidad.',
          icon: 'CámaraLenta',
        },
        {
          id: 'FEAT012',
          name: 'Resistente al Agua',
          description: 'Equipos diseñados para resistir condiciones húmedas.',
          icon: 'ResistenteAgua',
        },
        {
          id: 'FEAT013',
          name: 'Montura Rápida',
          description: 'Fácil montaje y desmontaje de accesorios.',
          icon: 'MonturaRápida',
        },
        {
          id: 'FEAT014',
          name: 'Pantalla Táctil',
          description: 'Interfaz de usuario intuitiva con pantalla táctil.',
          icon: 'PantallaTáctil',
        },
        {
          id: 'FEAT015',
          name: 'Filtro de Color',
          description:
            'Diversos filtros para ajustes de color en tus fotos y videos.',
          icon: 'FiltroColor',
        },
        {
          id: 'FEAT016',
          name: 'Grabación 360°',
          description:
            'Captura de video en 360 grados para una experiencia inmersiva.',
          icon: '360',
        },
        {
          id: 'FEAT017',
          name: 'Compatibilidad con Bluetooth',
          description: 'Conexión inalámbrica sencilla a otros dispositivos.',
          icon: 'Bluetooth',
        },
        {
          id: 'FEAT018',
          name: 'Montura para Micrófono',
          description: 'Acopla fácilmente un micrófono a tu cámara.',
          icon: 'MonturaMicrófono',
        },
        {
          id: 'FEAT019',
          name: 'Grabación en HDR',
          description: 'Videos con alto rango dinámico para mayor detalle.',
          icon: 'HDR',
        },
        {
          id: 'FEAT020',
          name: 'Asistente de Enfoque',
          description:
            'Herramientas para un enfoque preciso en todas las condiciones.',
          icon: 'AsistenteEnfoque',
        },
      ]

        .filter((feature) => {
          const searchValue = search.toLowerCase()
          return (
            feature.id.toLowerCase().includes(searchValue) ||
            feature.name.toLowerCase().includes(searchValue) ||
            feature.description.toLowerCase().includes(searchValue)
          )
        })
        .filter((feature) => {
          if (
            filters.customer.length > 0 &&
            !filters.customer.includes(feature.name)
          ) {
            return false
          }
          return true
        })
        .sort((a, b) => {
          if (sort.order === 'asc') {
            return a[sort.key] > b[sort.key] ? 1 : -1
          } else {
            return a[sort.key] < b[sort.key] ? 1 : -1
          }
        }),
    [search, sort, filters]
  )
  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === 'asc' ? 'desc' : 'asc' })
    } else {
      setSort({ key, order: 'asc' })
    }
  }
  const handleFilterChange = (type, value) => {
    if (type === 'customer') {
      setFilters({
        ...filters,
        customer: filters.customer.includes(value)
          ? filters.customer.filter((item) => item !== value)
          : [...filters.customer, value],
      })
    }
  }
  const handleEditFeature = (feature) => {}
  const handleDeleteFeature = (feature) => {}
  return (
    <div className='flex flex-col gap-4 p-4 md:p-6'>
      <div className='flex items-center gap-4'>
        <div className='relative w-full'>
          <Input
            placeholder='Buscar características...'
            className='bg-white dark:bg-gray-950 pl-8'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='shrink-0'>
              <ArrowUpDownIcon className='w-4 h-4 mr-2' />
              Ordenar por
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[200px]' align='end'>
            <DropdownMenuRadioGroup value={sort.key} onValueChange={handleSort}>
              <DropdownMenuRadioItem value='id'>
                Característica #
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='name'>Nombre</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='description'>
                Descripción
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='shrink-0'>
              <FilterIcon className='w-4 h-4 mr-2' />
              Filtros
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[200px]' align='end'>
            <div className='grid gap-2'>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox
                  checked={filters.customer.includes('Diseño Responsivo')}
                  onCheckedChange={() =>
                    handleFilterChange('customer', 'Diseño Responsivo')
                  }
                />
                Diseño Responsivo
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox
                  checked={filters.customer.includes('Modo Oscuro')}
                  onCheckedChange={() =>
                    handleFilterChange('customer', 'Modo Oscuro')
                  }
                />
                Modo Oscuro
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox
                  checked={filters.customer.includes('Accesibilidad')}
                  onCheckedChange={() =>
                    handleFilterChange('customer', 'Accesibilidad')
                  }
                />
                Accesibilidad
              </Label>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <AdminFeatureDialog />
      </div>
      <div className='overflow-hidden rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('id')}
              >
                Característica #
                {sort.key === 'id' && (
                  <span className='ml-1'>
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('name')}
              >
                Nombre
                {sort.key === 'name' && (
                  <span className='ml-1'>
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('description')}
              >
                Descripción
                {sort.key === 'description' && (
                  <span className='ml-1'>
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead>Icono</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.id}>
                <TableCell className='font-medium'>{feature.id}</TableCell>
                <TableCell>{feature.name}</TableCell>
                <TableCell>{feature.description}</TableCell>
                <TableCell>
                  <ComponentIcon className='w-4 h-4' />
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleEditFeature(feature)}
                    >
                      <DeleteIcon className='w-4 h-4' />
                      <span className='sr-only'>Editar</span>
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleDeleteFeature(feature)}
                    >
                      <Trash2Icon className='w-4 h-4' />
                      <span className='sr-only'>Eliminar</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminFeaturesTable
