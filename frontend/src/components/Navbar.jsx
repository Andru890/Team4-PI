import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link
        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 dark:after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full"
        href="#"
      >
        Inicio
      </Link>
      <Link
        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 dark:after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full"
        href="#"
      >
        Servicios
      </Link>
      <Link
        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 dark:after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full"
        href="#"
      >
        Contacto
      </Link>
    </nav>
  );
};

export default Navbar;
