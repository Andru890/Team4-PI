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

  useEffect(() => {
    const fetchReservations = async () => {
      const userInfo = getUserInfoFromToken()
      if (userInfo && userInfo.email) {
        try {
          const data = await getReservationsByUser(userInfo.email)
          setReservations(data)
        } catch (error) {
          console.error('Error fetching reservations:', error)
        }
      }
    }

    fetchReservations()
  }, [getUserInfoFromToken])

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
                {reservation.products.map((product) => product.name).join(', ')}
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
                >
                  {reservation.status}
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
