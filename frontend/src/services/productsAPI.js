import axios from 'axios';

const productApi = axios.create({
  baseURL: 'http://localhost:3001/products',
});

export const getProduct = async () => {
  const response = await productApi.get(`/products`);
  return response.data;
};

export const getProductById = async id => {
  const response = await productApi.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async product => {
  const response = await productApi.post(`/products`, product);
  return response.data;
};

export const updateProduct = async product => {
  const response = await productApi.put(`/products/${product.id}`, product);
  return response.data;
};

export const deleteProduct = async id => {
  const response = await productApi.delete(`/products/${id}`);
  return response.data;
};
