// @ts-nocheck

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
    const response = axios.get('https://stock-management-server-ten.vercel.app/get');
    return response;
})

export const addProduct = createAsyncThunk(
  "addProduct",
  async (data) => {
    const response = await axios.post('https://stock-management-server-ten.vercel.app/add', {
      name: data.name,
      price: data.price,
      quantity: data.quantity
    });
    return response.data.response;
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (data) => {
    const response = await axios.delete(
      `https://stock-management-server-ten.vercel.app/delete/${data}`
    );
    return response.data.response;
  }
);

export const editProduct = createAsyncThunk(
  "editProduct",
  async (data) => {
    const response = await axios.put(
      `https://stock-management-server-ten.vercel.app/update/${data.id}`,
      {
        name: data.name,
        price: data.price,
        quantity: data.quantity
      }
    );
    return response.data.response;
  }
);


const productSlice = createSlice({
    name: "products",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
        searchTerm: "",
        isLoggedIn: false
    },
    reducers: {
      setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state,action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        })
    },
});

export const { setSearchTerm, setLoggedIn } = productSlice.actions;
export default productSlice.reducer;