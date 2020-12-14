import React, { useState, useContext, useEffect } from 'react';
import { FetchContext } from './../context/FetchContext';
import { publicFetch } from './../util/fetch';
import { Redirect } from 'react-router-dom';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';

export default function Update({ match }) {
    
    const fetchContext = useContext(FetchContext);
    const [product, setProduct] = useState([])
    const [redirectOnUpdate, setRedirectOnUpdate] = useState(false)
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [category, setCategory] = useState()
    const [values, setValues] = useState({})
    
    const id = match.params.id;

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await publicFetch.get(
                  `product/update/${id}`
                );
                console.log(data);
                setProduct(data);
            } catch (err) {
                console.log(err);
            }
        }

        getProduct();
    }, [])

    function handleChange(e) {
		values[e.target.name] = e.target.value
		setValues({
			values
		});
    }

    const handleSubmit = async () => {
        try {
            setRedirectOnUpdate(false)
            const { data } = await fetchContext.authAxios.patch(
              `product/${id}`, product
            );
            //Redirect to Gallery
            setTimeout(() => {
                setRedirectOnUpdate(true)
            }, 1000)
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
            {redirectOnUpdate && <Redirect to='/gallery' />}
            <section>
                <div className="update_card">
                    <h2>Product Update</h2>
                    {successMessage && (<FormSuccess text={successMessage} />)}
                    {errorMessage && <FormError text={errorMessage} />}
                    <form onSubmit={() => handleSubmit}>
                        <div className="product_id">
                            <label htmlFor="id">Product Id<span className="red_info"> *</span></label>
                            <input type="text" id="id" name="id" required
                            value={product._id}
                            />
                        </div>
                        <div className="product_name">
                            <label htmlFor="title">Title<span className="red_info"> *</span></label>
                            <input type="text" id="title" name="title" required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="description">
                            <label htmlFor="description">Description<span className="red_info"> *</span></label>
                            <textarea name="description" id="description" cols="30" rows="5" required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <div className="category">
                            <select name="category" id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose category</option>
                                <option value="fabrics">Fabrics</option>
                                <option value="bags">Bags</option>
                                <option value="shoe">Shoe</option>
                                <option value="ornaments">Ornaments</option>
                            </select>
                        </div>
                        <div className="price_form">
                            <label htmlFor="price">Price<span className="red_info"> *</span></label>
                            <input type="text" id="price" name="price" required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="update_btn">Update</button>
                    </form>
                </div>
            </section>
        </div>
    )
}
