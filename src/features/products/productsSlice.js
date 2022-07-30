import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const URL = "https://api.escuelajs.co/api/v1/products"

const initialState = {
    products:{
        products: [],
        status: 'idle',
        error: null,
    },
    product:{
        product: {},
        status: 'idle',
        error: null,
    }
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
        return response.data
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
        const {id, ...restOfProduct} = product
        const response = await axios.put(`${URL}/${id}`,restOfProduct)
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
            //GET ALL
            .addCase(fetchAllProducts.pending, (state,action) => {
                state.products.status = "loading"
            })
            .addCase(fetchAllProducts.fulfilled, (state,action) => {
                state.products.status = "succeeded"
                state.products.products = state.products.products.concat(action.payload)
            })
            .addCase(fetchAllProducts.rejected, (state,action) => {
                state.products.status = "failed"
                state.products.error = action.error.message
            })
            //GET ONE
            .addCase(fetchOneProduct.pending, (state,action) => {
                state.product.status = "loading"
            })
            .addCase(fetchOneProduct.fulfilled, (state,action) => {
                state.product.status = "succeeded"
                state.product.product = action.payload
            })
            .addCase(fetchOneProduct.rejected, (state,action) => {
                state.product.status = "failed"
                state.product.error = action.error.message
            })
            //POST
            .addCase(addNewProduct.fulfilled, (state,action) => {
                // console.log(action.payload.data)
                state.products.status = "succeeded"
                state.products.products.push(action.payload.data)
                //pensar si se debe agregar al state desde aqui
            })
            //PUT
            .addCase(updateProduct.fulfilled, (state,action) => {
                console.log(action.payload.data)
                state.products.status = "succeeded"
                const { id } = action.payload.data;
                const products = state.products.products.filter(product => product.id !== id);
                
                state.products.products = [...products, action.payload.data]
                // state.products.products[(action.payload.data.id)-1] = action.payload.data
                //pensar si se debe agregar al state desde aqui
            })
    }
})


export const selectAllProducts = (state) => state.products.products.products;
export const getProductsStatus = (state) => state.products.products.status;
export const getProductsError = (state) => state.products.products.error;

export const selectOneProduct = (state) => state.products.product.product;
export const getProductStatus = (state) => state.products.product.status;
export const getProductError = (state) => state.products.product.error;

export default productsSlice.reducer