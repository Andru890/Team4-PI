import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '@/components/ItemListContainer/ItemList';
import UseLoader from '@/hooks/useLoader';
import products from '@/data/products';

const ItemListContainer = () => {
  const [productList, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId, offerId } = useParams();

  useEffect(() => {
    const getProducts = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(products);
      }, 2000);
    });

    getProducts
      .then(response => {
        categoryId
          ? setProducts(
              response.filter(product => product.category === categoryId)
            )
          : setProducts(response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId, offerId]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6">
        <div className="grid gap-4">
          <h2 className="text-3xl font-bold tracking-tighter">
            Productos destacados
          </h2>
          <p className="text-gray-500 dark:text-gray-400 ">
            Descubre nuestros productos más populares.
          </p>
        </div>
        <div />
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 mt-5">
        {isLoading ? <UseLoader /> : <ItemList productList={productList} />}
      </div>
    </section>
  );
};

export default ItemListContainer;
