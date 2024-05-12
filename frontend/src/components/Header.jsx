import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import HamburgerMenu from '@/components/HamburgerMenu';

export default function Component() {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-[#4C6B8A]">
      <div className="flex items-center gap-2">
        <MountainIcon className="h-6 w-6" />
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

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
