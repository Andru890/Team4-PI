import { Link } from 'react-router-dom';
import { routes } from '@/routes/routes';

const ItemDetail = ({ product }) => {
  return (
    <div id="item-detail" className="item-detail">
      <div className="item-detail__image">
        <img
          className="item-detail__image"
          src={product.img ? product.img : '/placeholder.svg'}
          alt={product.name ? product.name : 'Product nuevo'}
        />
      </div>
      <div className="item-detail__info">
        <h1 className="item-detail__title">{product.name}</h1>
        <p className="item-detail__description">{product.description}</p>
        <p className="item-detail__price">{product.price}</p>

        <Link to={routes.home}>
          <button className="item-detail__button">Seguir comprando</button>{' '}
        </Link>
      </div>
    </div>
  );
};

export default ItemDetail;
