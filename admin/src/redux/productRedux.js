import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "prodiuct",
  initialState: {
    products: [],
    isfetching: false,
    error: false,
  },
  reducers: {
    // GET ALL
    getProductStart: (state) => {
      state.isfetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isfetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isfetching = false;
      state.error = true;
    },
    // DELETE METHOD
    deleteProductStart: (state) => {
      state.isfetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isfetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProductFailure: (state) => {
      state.isfetching = false;
      state.error = true;
    },

    // Edit Failure

    updateProductStart: (state) => {
      state.isfetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isfetching = false;
      state.products[state.products.findIndex((item)=>item._id===action.payload.id)]=action.payload.product;
    },
    updateProductFailure: (state) => {
      state.isfetching = false;
      state.error = true;
    },

    // Addd
    AddProductStart: (state) => {
      state.isfetching = true;
      state.error = false;
    },
    AddProductSuccess: (state, action) => {
      state.isfetching = false;
      state.products.push(action.payload)
    },
    AddProductFailure: (state) => {
      state.isfetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductFailure,
  getProductSuccess,
  getProductStart,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  AddProductFailure,
  AddProductStart,
  AddProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;
