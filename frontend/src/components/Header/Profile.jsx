import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { routes } from '@/routes/routes'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/auth.context'
import useCloudinary from '@/hooks/useCloudinary'
import { getUserByEmail } from '@/services/userAPI'

const Profile = () => {
  const { logout, handleUpdateUser, getEmailFromToken } = useAuthContext()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
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
      const email = getEmailFromToken() // Usa la función para obtener el correo del token
      if (email) {
        try {
          const userData = await getUserByEmail(email)
          setUser(userData)
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
  }, [getEmailFromToken])

  const getInitials = (name, lastname) => {
    if (!name || !lastname) return 'NA'
    return `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase()
  }

  const handleLogout = () => {
    logout()
      .then(() => {
        window.location.reload()
        navigate(routes.home)
      })
      .catch((error) => {
        console.error('Error during logout:', error)
      })
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setLoadingImage(true)
      const imageUrl = await uploadImage(file)
      if (imageUrl) {
        const updatedUser = { ...user, imageUrl }
        await handleUpdateUser(updatedUser)
        setUser(updatedUser)
      }
      setLoadingImage(false)
    }
    setIsEditingImage(false)
  }

  const handleSaveChanges = async () => {
    const updatedUser = { ...user, name, lastname, email, phone, city }
    await handleUpdateUser(updatedUser)
    setUser(updatedUser)
    setIsEditingProfile(false)
  }

  const isAdmin = user?.roles?.includes('admin')

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='h-9 w-9 relative'>
            <AvatarImage
              alt={`@${user?.name}`}
              src={user?.imageUrl || '/placeholder-avatar.jpg'}
            />
            <AvatarFallback>
              {getInitials(user?.name, user?.lastname)}
            </AvatarFallback>
            <span className='sr-only'>Toggle user menu</span>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setDialogOpen(true)}
          >
            Mi Perfil
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link to={routes.favs}>
            <DropdownMenuItem className='cursor-pointer'>
              Mis Favoritos
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          {isAdmin && (
            <>
              <Link to={routes.dashboard}>
                <DropdownMenuItem className='cursor-pointer'>
                  Panel Administración
                </DropdownMenuItem>
              </Link>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
            Salir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='mx-auto max-w-md rounded-xl bg-white shadow-lg dark:bg-gray-800'>
          <div className='relative h-40 overflow-hidden rounded-t-xl'>
            <img
              src='/logo.jpg'
              alt='Background'
              className='h-full w-full object-cover object-center'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent' />
          </div>
          <div className='-mt-16 flex flex-col items-center justify-center cursor-pointer'>
            <Avatar className='h-32 w-32 border-4 border-white dark:border-gray-800 relative'>
              {loadingImage && (
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                  <span className='text-white'>Cargando...</span>
                </div>
              )}
              <AvatarImage src={user?.imageUrl} alt='User Avatar' />
              <AvatarFallback>
                {getInitials(user?.name, user?.lastname)}
              </AvatarFallback>
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
            <div className='mt-4 text-center'>
              {!isEditingProfile ? (
                <>
                  <h3 className='text-2xl font-bold'>
                    {user?.name} {user?.lastname}
                  </h3>
                  <p className='text-gray-500 dark:text-gray-400 text-lg'>
                    {user?.email}
                  </p>
                  <div className='my-4 border-b border-gray-300 dark:border-gray-700'></div>
                  <div className='grid grid-cols-2 gap-4 text-left'>
                    <div>
                      <p className='text-gray-500 dark:text-gray-400 font-medium'>
                        Telefono
                      </p>
                      <p className='text-gray-700 dark:text-gray-300'>
                        {user?.phone || 'No disponible'}
                      </p>
                    </div>
                    <div>
                      <p className='text-gray-500 dark:text-gray-400 font-medium'>
                        Localización
                      </p>
                      <p className='text-gray-700 dark:text-gray-300'>
                        {user?.city || 'No disponible'}
                      </p>
                    </div>
                    <div>
                      <p className='text-gray-500 dark:text-gray-400 font-medium'>
                        Role
                      </p>
                      <p className='text-gray-700 dark:text-gray-300'>
                        {isAdmin ? 'Admin' : 'User'}
                      </p>
                    </div>
                    <div>
                      <p className='text-gray-500 dark:text-gray-400 font-medium'>
                        ID
                      </p>
                      <p className='text-gray-700 dark:text-gray-300'>
                        {user?.id}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsEditingProfile(true)}
                    className='mt-4'
                  >
                    Editar
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
                    className='mb-4'
                  />
                  <Button onClick={handleSaveChanges} disabled={isUploading}>
                    {isUploading ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                  <Button
                    onClick={() => setIsEditingProfile(false)}
                    className='ml-2'
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Profile
