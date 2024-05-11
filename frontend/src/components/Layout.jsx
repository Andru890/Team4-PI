import { Routes, Route } from 'react-router-dom';
import { routes } from '../routes/routes';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import NotFound from './NotFound';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.notFound} element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Layout;
