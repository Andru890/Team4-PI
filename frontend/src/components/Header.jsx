import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import HamburgerMenu from '@/components/HamburgerMenu';
import { CameraIcon } from '@/components/Icons';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-background">
      <Link to="/">
        <div className="flex items-center gap-2">
          <CameraIcon className="h-6 w-6" />
          <span className="text-lg text-primary font-semibold">
            VisualStudio Service
          </span>
        </div>
      </Link>
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
};
export default Header;
