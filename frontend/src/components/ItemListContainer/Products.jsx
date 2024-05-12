import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Products = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6">
        <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <Link className="absolute inset-0 z-10" href="#">
            <span className="sr-only">View</span>
          </Link>
          <img
            alt="Product 1"
            className="object-cover w-full h-64"
            height="300"
            src="/placeholder.svg"
            style={{
              aspectRatio: '300/300',
              objectFit: 'cover',
            }}
            width="300"
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-bold text-xl">Producto 1</h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              Descripción breve del producto 1
            </p>
            <div className="mt-4">
              <Button className="w-full" size="sm">
                Ver detalles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
