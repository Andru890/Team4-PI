import { Routes, Route } from 'react-router-dom';
import { routes } from '@/routes/routes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

const Layout = () => {
  return (
    <html lang="es">
      <body>
        <Header />
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.notFound} element={<NotFound />} />
        </Routes>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
