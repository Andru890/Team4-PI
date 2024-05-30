import { useAuthContext } from '@/context/auth.context'
import { Button } from '@/components/ui/button'
import { CameraIcon, PencilIcon } from '@/components/Icons'

const ProfileContainer = () => {
  const { user } = useAuthContext()

  if (!user) {
    return <p>Por favor inicia sesión para ver esta página.</p>
  }

  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-lg mt-20 h-screen'>
      <div className='px-4 py-5 sm:px-6 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              {user.name} {user.lastname}
            </h3>
            <p className='text-sm text-gray-500'>{user.role.name}</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button size='icon' variant='ghost'>
            <PencilIcon className='h-5 w-5 text-gray-500' />
            <span className='sr-only'>Edit Profile</span>
          </Button>
          <Button size='icon' variant='ghost'>
            <CameraIcon className='h-5 w-5 text-gray-500' />
            <span className='sr-only'>Change Profile Picture</span>
          </Button>
        </div>
      </div>
      <div className='border-t border-gray-200'>
        <dl>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Rol</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {user.role.name.toUpperCase()}
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              Fecha de creación
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              Mayo 29, 2024
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Ubicación</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {user.city || 'No disponible'}
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Telefono</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {user.phone || 'No disponible'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default ProfileContainer
