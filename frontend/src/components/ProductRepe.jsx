import { useState } from 'react';

function ProductRepe() {
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddProduct = () => {
    if (!productName.trim()) {
      setErrorMessage('¡El nombre del producto no puede estar vacío!');
      return;
    }

    if (products.some(product => product === productName)) {
      setErrorMessage('¡El nombre del producto ya está en uso!');
      return;
    }

    setProducts([...products, productName]);
    setProductName('');
    setErrorMessage('');
  };

  return (
    <div>
      <input
        type="text"
        value={productName}
        onChange={e => setProductName(e.target.value)}
      />
      <button onClick={handleAddProduct}>Agregar Producto</button>
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductRepe;

// ! SOME:  toma una funcion de callback como argumento , esto hace que se ejecute una por cada elemento si encuentra el igual da true  y asi hasta recorrer todo el array de articulos.
