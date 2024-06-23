import { useAuthContext } from '@/context/auth.context'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import useCloudinary from '@/hooks/useCloudinary'
import { getUserByEmail } from '@/services/userAPI'

const ProfileContainer = () => {
  const { handleUpdateUser, getUserInfoFromToken } = useAuthContext()
  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState([])
  const [isEditingImage, setIsEditingImage] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const { uploadImage, isUploading } = useCloudinary()

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = getUserInfoFromToken()
      if (userInfo && userInfo.email) {
        try {
          const userData = await getUserByEmail(userInfo.email)
          setUser(userData)
          setRoles(
            userInfo.roles.map((role) =>
              role.authority ? role.authority : role
            )
          ) // Normalizamos los roles
          setName(userData.name || '')
          setLastname(userData.lastname || '')
          setEmail(userData.email || '')
          setPhone(userData.phone || '')
          setCity(userData.city || '')
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }

    fetchUser()
  }, [getUserInfoFromToken])

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setLoadingImage(true)
      try {
        const imageUrl = await uploadImage(file)
        if (imageUrl) {
          const updatedUser = {
            ...user,
            imageUrl,
          }
          await handleUpdateUser(updatedUser)
        }
      } catch (error) {
        console.error('Error updating user image:', error)
      } finally {
        setLoadingImage(false)
      }
    }
    setIsEditingImage(false)
  }

  const handleSaveChanges = async () => {
    const updatedUser = {
      id: user.id,
      name,
      lastname,
      email,
      phone,
      city,
      imageUrl: user.imageUrl,
    }
    try {
      await handleUpdateUser(updatedUser)
      setIsEditingProfile(false)
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const getInitials = (name, lastname) => {
    if (!name || !lastname) return 'NA'
    return `${name.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  if (!user) {
    return <p>Por favor inicia sesión para ver esta página.</p>
  }

  return (
    <div className='w-full h-screen mt-20'>
      <div className='bg-foreground text-primary-foreground p-8 flex items-center gap-6'>
        <div className='relative'>
          <Avatar className='h-20 w-20 cursor-pointer'>
            {loadingImage && (
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <span className='text-white'>Cargando...</span>
              </div>
            )}
            <AvatarImage src={user.imageUrl || '/placeholder-user.jpg'} />
            <AvatarFallback>{getInitials(name, lastname)}</AvatarFallback>
            <div
              className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity'
              onClick={() => setIsEditingImage(true)}
            >
              <span className='text-white'>Editar</span>
            </div>
            {isEditingImage && (
              <input
                type='file'
                className='absolute inset-0 opacity-0 cursor-pointer'
                onChange={handleImageChange}
              />
            )}
          </Avatar>
        </div>
        <div className='grid gap-1'>
          {!isEditingProfile ? (
            <>
              <h2 className='text-2xl font-bold'>
                {capitalizeFirstLetter(name)} {capitalizeFirstLetter(lastname)}
              </h2>
              <div className='text-sm text-muted-foreground'>{email}</div>
              <div className='text-sm text-muted-foreground'>{phone}</div>
              <Button
                onClick={() => setIsEditingProfile(true)}
                className='mt-2'
              >
                Editar Perfil
              </Button>
            </>
          ) : (
            <>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nombre'
                className='mb-2'
              />
              <Input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder='Apellido'
                className='mb-2'
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Correo electrónico'
                className='mb-2'
              />
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Teléfono'
                className='mb-2'
              />
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='Localización'
                className='mb-2'
              />
              <div className='flex gap-2'>
                <Button onClick={handleSaveChanges} disabled={isUploading}>
                  {isUploading ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
                <Button onClick={() => setIsEditingProfile(false)}>
                  Cancelar
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className='p-8'>
        <h3 className='text-xl font-bold mb-4'>Historial de Alquileres</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Equipo</TableHead>
              <TableHead>Costo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Período de Alquiler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>15 de junio de 2023</TableCell>
              <TableCell>Drone DJI Mavic Pro</TableCell>
              <TableCell>$50</TableCell>
              <TableCell>
                <Badge variant='success'>Devuelto</Badge>
              </TableCell>
              <TableCell>10 de junio de 2023 - 15 de junio de 2023</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>20 de mayo de 2023</TableCell>
              <TableCell>GoPro HERO10 Black</TableCell>
              <TableCell>$30</TableCell>
              <TableCell>
                <Badge>Activo</Badge>
              </TableCell>
              <TableCell>20 de mayo de 2023 - 5 de junio de 2023</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>10 de abril de 2023</TableCell>
              <TableCell>Canon EOS R6</TableCell>
              <TableCell>$75</TableCell>
              <TableCell>
                <Badge variant='success'>Devuelto</Badge>
              </TableCell>
              <TableCell>5 de abril de 2023 - 10 de abril de 2023</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>25 de marzo de 2023</TableCell>
              <TableCell>Nikon D850</TableCell>
              <TableCell>$60</TableCell>
              <TableCell>
                <Badge variant='success'>Devuelto</Badge>
              </TableCell>
              <TableCell>20 de marzo de 2023 - 25 de marzo de 2023</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ProfileContainer
