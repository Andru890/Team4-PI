import { useAuthContext } from '@/context/auth.context'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

const ProfileContainer = () => {
  const { user } = useAuthContext()

  if (!user) {
    return <p>Por favor inicia sesión para ver esta página.</p>
  }

  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-lg mt-20 h-screen'>
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button variant='outline'>Open Profile</Button>
        </DialogTrigger>
        <DialogContent className='mx-auto max-w-md rounded-xl bg-white shadow-lg dark:bg-gray-800'>
          <div className='relative h-40 overflow-hidden rounded-t-xl'>
            <img
              src='/placeholder.svg'
              alt='Background'
              className='h-full w-full object-cover object-center'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent' />
          </div>
          <div className='-mt-16 flex flex-col items-center justify-center'>
            <Avatar className='h-32 w-32 border-4 border-white dark:border-gray-800'>
              <image src={user.imageUrl} alt='User Avatar' />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className='mt-4 text-center'>
              <h3 className='text-2xl font-bold'>{user.name}</h3>
              <p className='text-gray-500 dark:text-gray-400 text-lg'>
                {user.email}
              </p>
              <Separator className='my-4' />
              <div className='grid grid-cols-2 gap-4 text-left'>
                <div>
                  <p className='text-gray-500 dark:text-gray-400 font-medium'>
                    Telefono
                  </p>
                  <p className='text-gray-700 dark:text-gray-300'>
                    {user.phone || 'No disponible'}
                  </p>
                </div>
                <div>
                  <p className='text-gray-500 dark:text-gray-400 font-medium'>
                    Localización
                  </p>
                  <p className='text-gray-700 dark:text-gray-300'>
                    {user.city || 'No disponible'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProfileContainer
