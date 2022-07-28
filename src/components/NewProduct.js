import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addNewProduct } from '../features/products/productsSlice';

const NewProduct = () => {
  
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
//   {
//     "title": "Handmade Rubber Hatttt",
//     "price": 741,
//     "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//     "categoryId": 1,
//     "images": [
//         "https://api.lorem.space/image/fashion?w=640&h=480&r=4288",
//         "https://api.lorem.space/image/fashion?w=640&h=480&r=6254",
//         "https://api.lorem.space/image/fashion?w=640&h=480&r=9968"
//     ]
// }
    const onChangeTitle = e => setTitle(e.target.value)
    const onChangePrice = e => setPrice(e.target.value)
    const onChangeDescription = e => setDescription(e.target.value)
    const onChangeCategoryId = e => setCategoryId(e.target.value)
    // const onChangeImages = e => setImages(e.target.value)

    const saveProduct = () =>{
      try {
        // setAddRequestStatus('pending')
        dispatch(addNewProduct({ 
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
          console.error('Failed to save the post', err)
      } finally {
          // setAddRequestStatus('idle')
      }
    }
    
  
  return (
    <section>
            <h2>Add a New Product</h2>
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
                    onClick={saveProduct}
                    // disabled={!canSave}
                    >Save Post
                </button>
            </form>
        </section>
  )
}

export default NewProduct