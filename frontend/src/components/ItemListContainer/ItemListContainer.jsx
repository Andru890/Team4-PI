import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
        {isLoading ? <UseLoader /> : <ItemList productList={productList} />}
      </div>
    </section>
  );
};

export default ItemListContainer;
