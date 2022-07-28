import React, { useEffect } from 'react'
import { selectAllProducts, getProductsStatus, getProductsError, fetchAllProducts } from "../features/products/productsSlice";
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts)
  const productsStatus = useSelector(getProductsStatus)
  const error = useSelector(getProductsError)

  useEffect(() => {
    dispatch(fetchAllProducts())
    //.unwrap
  }, [])

  let content;
    if (productsStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (productsStatus === 'succeeded') {
        content = products.map((p)=><p>{p.title}</p>);
    } else if (productsStatus === 'failed') {
        content = <p>Error</p>;
    }

  return (
    <div>
      {content}
    </div>
  )
}

export default Home