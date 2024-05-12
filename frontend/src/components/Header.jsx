import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 bg-blue-500 text-white p-5 z-50">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <img src="/path/to/logo.png" alt="Logo" className="mr-2" />
            <Link to="/" className="text-2xl">
              Nombre de la empresa
            </Link>
          </div>
          <div className="ml-auto">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
              Crear cuenta
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Iniciar sesión
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden block text-white mt-4"
        >
          Menu
        </button>
        <nav
          className={`mt-4 flex flex-col sm:flex-row justify-around ${
            isOpen ? 'block' : 'hidden'
          } sm:block`}
        >
          <Link to="/page1" className="text-lg">
            Página 1
          </Link>
          <Link to="/page2" className="text-lg">
            Página 2
          </Link>
          <Link to="/page3" className="text-lg">
            Página 3
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
