import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { getReservationsByUser } from '@/services/reservationAPI'
import { useAuthContext } from '@/context/auth.context'

const BookingHistory = () => {
  const { getUserInfoFromToken } = useAuthContext()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReservations = async () => {
      const userInfo = getUserInfoFromToken()
      if (userInfo && userInfo.email) {
        try {
          const data = await getReservationsByUser(userInfo.email)
          setReservations(data)
        } catch (error) {
          console.error('Error fetching reservations:', error)
          setError('Error fetching reservations')
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
        setError('User information is missing')
      }
    }

    fetchReservations()
  }, [getUserInfoFromToken])

  if (loading) {
    return <div className='p-8'>Loading...</div>
  }

  if (error) {
    return <div className='p-8'>{error}</div>
  }

  return (
    <div className='p-8'>
      <h3 className='text-xl font-bold mb-4'>Historial de Alquileres</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Equipo</TableHead>
            <TableHead>Fecha de Entrega</TableHead>
            <TableHead>Fecha de Devolución</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.id}</TableCell>
              <TableCell>
                {reservation.products
                  ?.map((product) => product.name)
                  .join(', ')}
              </TableCell>
              <TableCell>
                {new Date(reservation.dateIn).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(reservation.dateOut).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    reservation.status === 'Devuelto' ? 'success' : 'warning'
                  }
                  className={` ${
                    reservation.reserved
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}
                >
                  {reservation.status === 'Devuelto' ? 'Devuelto' : 'Reservado'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default BookingHistory
