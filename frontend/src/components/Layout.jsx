import { Routes, Route } from 'react-router-dom';
import { routes } from '../Routes/routes';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Layout;