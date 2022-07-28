import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const URL = "https://api.escuelajs.co/api/v1/products"

const initialState = {
    products: [],
    status: 'idle',
    error: null,
}

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async ()=>{
    try {
        const response = await axios.get(URL);
        console.log(response)
        return response.data
    }catch(err){
        return err.message
    }
})

export const fetchOneProduct = createAsyncThunk('products/fetchOneProduct', async (id)=>{
    try {
        const response = await axios.get(`${URL}/${id}`);
        console.log(response)
        return response
    }catch(err){
        return err.message
    }
})

export const addNewProduct = createAsyncThunk('products/addNewProduct', async (product)=>{
    try {
        const response = await axios.post(URL,product)
        console.log(response)
        return response
    }catch(err){
        return err.message
    }
})

export const updateProduct = createAsyncThunk('products/updateProduct', async (product)=>{
    try {
        const {id} = product
        const response = await axios.put(`${URL}/${id}`,product)
        console.log(response)
        return response 
    }catch(err){
        return err.message
    }  
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id)=>{
    try{
        const response = await axios.delete(`${URL}/${id}`)
        console.log(response)
        return response
    } catch (err){
        // {
        //     "statusCode": 404,
        //     "message": "Product not found",
        //     "error": "Not Found"
        // }
        return err.message
    }
    
})

const productsSlice = createSlice({
    name : "products",
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder
            .addCase(fetchAllProducts.pending, (state,action) => {
                state.status = "loading"
            })
            .addCase(fetchAllProducts.fulfilled, (state,action) => {
                state.status = "succeeded"
                state.products = state.products.concat(action.payload)
            })
            .addCase(fetchAllProducts.rejected, (state,action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(addNewProduct.fulfilled, (state,action) => {
                state.status = "succeeded"
                //pensar si se debe agregar al state desde aqui
            })
    }
})


export const selectAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export default productsSlice.reducer