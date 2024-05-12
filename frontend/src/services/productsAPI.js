import axios from 'axios';

const productApi = axios.create({
  baseURL: 'http://localhost:3001/products',
});

export const getProduct = async () => {
  try {
    const response = await productApi.get(`/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getProductById = async id => {
  try {
    const response = await productApi.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const createProduct = async product => {
  try {
    const response = await productApi.post(`/products`, product);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async product => {
  try {
    const response = await productApi.put(`/products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${product.id}:`, error);
    throw error;
  }
};

export const deleteProduct = async id => {
  try {
    const response = await productApi.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};
