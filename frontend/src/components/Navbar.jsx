import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full text-white flex justify-around p-5">
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
  );
};

export default Navbar;
