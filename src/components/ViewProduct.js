import React, {useEffect} from 'react'
  import { useParams, Link} from 'react-router-dom'

import { selectOneProduct, getProductStatus, getProductError, fetchOneProduct } from "../features/products/productsSlice";
import { useDispatch, useSelector } from 'react-redux'

const ViewProduct = () => {
  
  const {id} = useParams()

  const dispatch = useDispatch();

  const product = useSelector(selectOneProduct)
  const productStatus = useSelector(getProductStatus)
  const error = useSelector(getProductError)

  useEffect(() => {
    dispatch(fetchOneProduct(id));
    
    //.unwrap
  }, [])

  let content;
    if (productStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (productStatus === 'succeeded') {
        content = <div>
                    <p>{product.title}</p>
                    <Link to={`/products/edit/${product.id}`}>
                      edit
                    </Link>
                  </div>;
    } else if (productStatus === 'failed') {
        content = <p>{error}</p>;
    }

  return (
    <div>{content}</div>
  )
}

export default ViewProduct