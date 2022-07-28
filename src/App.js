import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from './components/Layout';
import Home from './components/Home';
import ViewProduct from './components/ViewProduct';
import NewProduct from './components/NewProduct';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/products/:id" element={<ViewProduct/>}/>
            <Route path="/products/new/:id" element={<NewProduct/>}/>
            <Route path="/products/edit/:id" element={<EditProduct/>}/>
            <Route path="*" element={<Navigate replace to="/" />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
