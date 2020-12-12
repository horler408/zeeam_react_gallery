import React, { useState, useContext, useEffect } from 'react';
import { FetchContext } from './../context/FetchContext';
import Axios from 'axios';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';

export default function Update({ match }) {
    
    const fetchContext = useContext(FetchContext);
    const [product, setProduct] = useState()
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    

    const id = match.params._id

    useEffect(() => {
        const getProduct = async () => {
            const response = await Axios.get(`http://localhost/api/product/update/${id}`)
            const result = await response.data
            setProduct(result)
        }
        getProduct()
    }, [])

    const handleChange = (e) => {
        setProduct({[e.target.name]: e.target.value})
    }

    const handleSubmit = async () => {
        try {
            const { data } = await fetchContext.authAxios.patch(
              `edit/${id}`, product
            );
            setErrorMessage(null);
            setSuccessMessage(data.message);
          } catch (err) {
            const { data } = err.response;
            setSuccessMessage(null);
            setErrorMessage(data.message);
          }
    }

    return (
        <div>
            <div className="update_card">
                {successMessage && (<FormSuccess text={successMessage} />)}
                {errorMessage && <FormError text={errorMessage} />}
                <form onSubmit={handleSubmit}>
                    <div className="product_id">
                        <label htmlFor="id">Product Id<span className="red_info"> *</span></label>
                        <input type="text" id="id" name="id" required
                        value={product._id}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="product_name">
                        <label htmlFor="title">Title<span className="red_info"> *</span></label>
                        <input type="text" id="title" name="title" required
                        value={product.title}
                        onChange={handleChange}
                        />
                    </div>
                    <div class="description">
                        <label for="description">Description<span class="red_info"> *</span></label>
                        <textarea name="description" id="description" cols="30" rows="5" required
                        value={product.description}
                        onChange={handleChange}
                        >
                        </textarea>
                    </div>
                    <div class="category">
                        <select name="category" id="category"
                        value={product.category}
                        onChange={handleChange}
                        >
                            <option value="">Choose category</option>
                            <option value="fabrics">Fabrics</option>
                            <option value="bags">Bags</option>
                            <option value="shoe">Shoe</option>
                            <option value="ornaments">Ornaments</option>
                        </select>
                    </div>
                    <div class="price_form">
                        <label for="price">Price<span class="red_info"> *</span></label>
                        <input type="text" id="price" name="price" required
                        value={product.price}
                        onChange={handleChange}
                        />
                    </div>
                    <div class="product_image">
                        <label for="image">Image Upload</label>
                        <input type="file" id="image" name="imageUrl" />
                    </div>
                    <button type="submit" class="update_btn">Submit</button>
                </form>
            </div>
        </div>
    )
}
