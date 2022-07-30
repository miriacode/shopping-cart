import React from 'react'
import { fetchOneProduct, selectOneProduct, updateProduct } from '../features/products/productsSlice';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const product = useSelector(selectOneProduct)

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [categoryId, setCategoryId] = useState(product.categoryId);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const {id} = useParams()
  const navigate = useNavigate();

  

  useEffect(() => {
    dispatch(fetchOneProduct(id))
    
  }, [dispatch, id])
  
    const onChangeTitle = e => setTitle(e.target.value)
    const onChangePrice = e => setPrice(e.target.value)
    const onChangeDescription = e => setDescription(e.target.value)
    const onChangeCategoryId = e => setCategoryId(e.target.value)
    // const onChangeImages = e => setImages(e.target.value)

    const editProduct = () =>{
      try {
        // setAddRequestStatus('pending')
        dispatch(updateProduct({
          id,
          title, 
          price, 
          description,
          categoryId,
          images,
      }))
        //.unwrap()

        setTitle('')
        setPrice('')
        setDescription('')
        setCategoryId('')
        setImages([])
        navigate('/')

      } catch (err) {
          console.error('Failed to update the product', err)
      } finally {
          // setAddRequestStatus('idle')
      }
    }
    
  
  return (
    <section>
            <h2>Edit Product</h2>
            <form>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={onChangeTitle}
                />
                {/* <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onChangeDescription}>
                    <option value=""></option>
                    {usersOptions}
                </select> */}
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={onChangePrice}
                />

                <label htmlFor="description">Description:</label>
                <input
                    id="description"
                    name="description"
                    value={description}
                    onChange={onChangeDescription}
                />

                <label htmlFor="categoryId">Category Id:</label>
                <input
                    type="number"
                    id="categoryId"
                    name="categoryId"
                    value={categoryId}
                    onChange={onChangeCategoryId}
                />

                <button
                    type="button"
                    onClick={editProduct}
                    // disabled={!canSave}
                    >Update Post
                </button>
            </form>
        </section>
  )
}

export default EditProduct