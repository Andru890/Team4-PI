import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card'

import {
  ActivityIcon,
  BarChart,
  DollarSignIcon,
  PackageIcon,
  LineChart,
  ShoppingCartIcon,
  UsersIcon,
} from '@/components/Icons'

const AdminDashboard = ({ productCount }) => {
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>Dashboard</h1>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>¡Bienvenido de nuevo!</CardTitle>
            <CardDescription>
              Aquí tienes un resumen rápido de tu negocio de alquiler de
              equipos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-2xl font-bold'>$0</h3>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Ingresos Totales
                  </p>
                </div>
                <DollarSignIcon className='h-8 w-8 text-primary' />
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-2xl font-bold'>{productCount}</h3>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Total Equipamiento
                  </p>
                </div>
                <PackageIcon className='h-8 w-8 text-primary' />
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-2xl font-bold'>0</h3>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Total de Pedidos
                  </p>
                </div>
                <ShoppingCartIcon className='h-8 w-8 text-primary' />
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-2xl font-bold'>0</h3>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Clientes Activos
                  </p>
                </div>
                <UsersIcon className='h-8 w-8 text-primary' />
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-2xl font-bold'>0%</h3>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Utilización de Equipos
                  </p>
                </div>
                <ActivityIcon className='h-8 w-8 text-primary' />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Equipos más Alquilados</CardTitle>
            <CardDescription>
              Un desglose de los alquileres de equipos más populares.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart className='aspect-[3/2]' />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Alquileres</CardTitle>
            <CardDescription>
              Una lista de los próximos alquileres de equipos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Equipo</TableHead>
                  <TableHead>Fecha de Inicio</TableHead>
                  <TableHead>Fecha de Fin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Canon EOS R6</TableCell>
                  <TableCell>15 de Mayo, 2023</TableCell>
                  <TableCell>20 de Mayo, 2023</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>Nikon D850</TableCell>
                  <TableCell>1 de Junio, 2023</TableCell>
                  <TableCell>7 de Junio, 2023</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Michael Johnson</TableCell>
                  <TableCell>Sony a7 III</TableCell>
                  <TableCell>10 de Julio, 2023</TableCell>
                  <TableCell>15 de Julio, 2023</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default AdminDashboard
