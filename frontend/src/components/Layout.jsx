import { Routes, Route } from 'react-router-dom';
import { routes } from '@/routes/routes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import AdministrationPanel from '@/pages/AdministrationPanel';

const Layout = () => {
  return (
    <html lang="es">
      <body>
        <Routes>
          <Route
            path={routes.home}
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path={routes.notFound}
            element={
              <>
                <Header />
                <NotFound />
                <Footer />
              </>
            }
          />
          <Route
            path={routes.administrationPanel}
            element={<AdministrationPanel />}
          />
        </Routes>
      </body>
    </html>
  );
};

export default Layout;
