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
  DollarSignIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from '@/components/Icons'

import { BarChart } from '@/components/AdminPanel/AdminBarChart'

const AdminDashboard = ({ productCount, userCount, products, users }) => {
  const categoryData = []

  if (products.length > 0) {
    const categories = products.map((product) => product.category)
    const categoryCount = categories.reduce((acc, category) => {
      if (!acc[category.id]) {
        acc[category.id] = { name: category.name, cantidad: 1 }
      } else {
        acc[category.id].cantidad += 1
      }
      return acc
    }, {})

    for (const value of Object.values(categoryCount)) {
      categoryData.push(value)
    }
  }

  const rentalsData = [] //! luego se va a cambiar por la data de los alquileres

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
                  <h3 className='text-2xl font-bold'>{userCount}</h3>
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
            <CardTitle>Categorías de Equipos Populares</CardTitle>
            <CardDescription>
              Una vista general de las categorías de equipos más populares.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart className='aspect-[1/1]' data={categoryData} />
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
            {rentalsData && rentalsData.length > 0 ? (
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
                  {rentalsData.map((rental) => (
                    <TableRow key={rental.id}>
                      <TableCell>{rental.client}</TableCell>
                      <TableCell>{rental.equipment}</TableCell>
                      <TableCell>{rental.startDate}</TableCell>
                      <TableCell>{rental.endDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>Sin alquileres aún</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Últimos Usuarios Registrados</CardTitle>
            <CardDescription>
              Una lista de los últimos usuarios registrados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {users && users.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.slice(-10).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>Sin usuarios registrados aún</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default AdminDashboard
