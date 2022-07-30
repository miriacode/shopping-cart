import React, { useEffect } from 'react'
import { selectAllProducts, getProductsStatus, getProductsError, fetchAllProducts } from "../features/products/productsSlice";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Home = () => {

  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts)
  const productsStatus = useSelector(getProductsStatus)
  const error = useSelector(getProductsError)

  useEffect(() => {
    dispatch(fetchAllProducts())
    //.unwrap
    console.log("vuelvo a la pag")
  }, [dispatch])

  let content;
    if (productsStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (productsStatus === 'succeeded') {
        content = products.map((p)=><Link to={`/products/${p.id}`}><p>{p.title} {p.price}</p></Link>);
    } else if (productsStatus === 'failed') {
        content = <p>{error}</p>;
    }

  return (
    <div>
      {console.log(error)}
      {content}
    </div>
  )
}

export default Home