import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
  {
    id: '1',
    name: 'Apple iPhone 14',
    price: '799',
    description: 'Smartphone by Apple',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23',
    price: '699',
    description: 'Flagship phone by Samsung',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    price: '399',
    description: 'Noise-canceling headphones',
  },
];

const productSlice = createSlice({
  name: 'products',
  initialState: {
    productList: initialProducts,
  },
  reducers: {
    addProduct: (state, action) => {
      state.productList.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, name, price, description } = action.payload;
      const product = state.productList.find((p) => p.id === id);
      if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
      }
    },
    removeProduct: (state, action) => {
      state.productList = state.productList.filter(
        (p) => p.id !== action.payload
      );
    },
  },
});

export const { addProduct, updateProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;