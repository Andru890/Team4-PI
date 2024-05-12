import React from 'react';
import Item from '@/components/ItemListContainer/Item';

const ItemList = ({ productList }) => {
  return (
    <>
      {productList.map(product => (
        <Item key={product.id} product={product} />
      ))}
    </>
  );
};
export default ItemList;
