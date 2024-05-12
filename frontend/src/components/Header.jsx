import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import HamburgerMenu from '@/components/HamburgerMenu';
import { CameraIcon, SearchIcon } from '@/components/Icons';

export default function Component() {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-background">
      <div className="flex items-center gap-2">
        <CameraIcon className="h-6 w-6" />
        <span className="text-lg text-primary font-semibold">
          VisualStudio Service
        </span>
      </div>
      <div className="flex-1 mx-auto max-w-md">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="w-full bg-white shadow-none appearance-none pl-8 md:w-1/2 lg:w-2/3 dark:bg-gray-950"
            placeholder="Buscar..."
            type="search"
          />
        </div>
      </div>
      <HamburgerMenu />
      <div className="ml-auto hidden lg:flex items-center gap-4">
        <Navbar />
        <div className="flex items-center gap-2">
          <Button variant="outline">Iniciar sesión</Button>
          <Button>Registrarse</Button>
        </div>
      </div>
    </header>
  );
}
