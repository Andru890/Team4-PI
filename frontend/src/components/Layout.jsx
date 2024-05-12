import { Routes, Route } from 'react-router-dom';
import { routes } from '@/routes/routes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import AddProducts from './../pages/AddProducts';
import AdministrationPanel from './../pages/AdministrationPanel';

const Layout = () => {
  return (
    <html lang="es">
      <body>
        <Header />
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.notFound} element={<NotFound />} />
          <Route
            path={routes.administrationPanel}
            element={<AdministrationPanel />}
          />
          <Route path={routes.addProducts} element={<AddProducts />} />
        </Routes>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
