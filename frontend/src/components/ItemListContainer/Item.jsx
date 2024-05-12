import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  return (
    <div
      className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
      id="item"
    >
      <div className="item-list-container__item__image">
        <img
          className="object-cover w-full h-64"
          height="300"
          src={product.img ? product.img : '/placeholder.svg'}
          alt={product.name ? product.name : 'Product nuevo'}
          style={{
            aspectRatio: '300/300',
            objectFit: 'cover',
          }}
          width="300"
        />
      </div>
      <div className="bg-white p-4 dark:bg-gray-950">
        <h3 className="font-bold text-xl">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4">
          <Link to={`/item/${product.id}`}>
            <button className="w-full" size="sm">
              Ver detalles
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Item;
