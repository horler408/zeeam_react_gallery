import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { publicFetch } from './../util/fetch';
import FormSuccess from './../components/FormSuccess';
import FormError from './../components/FormError';

const Details = ({ match, history }) => {
    //console.log(match);

    const [product, setProduct] = useState([])
    const [redirectOnDelete, setRedirectOnDelete] = useState(false)
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    
    const id = match.params.id

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await publicFetch.get(
                  `product/${id}`
                );
                console.log(data);
                setProduct(data);
            } catch (err) {
                console.log(err);
            }
        }

        getProduct();
    }, [id])

    const handleDelete = async (item) => {
        try {
            setRedirectOnDelete(false)
          if (
            window.confirm(
              'Are you sure you want to delete this item?'
            )
          ) {
            const { data } = await publicFetch.delete(
              `product/${item._id}`
            );

            setSuccessMessage(data.message);
            setErrorMessage(null);
            // Redirect to Gallery Page
            setTimeout(() => {
                setRedirectOnDelete(true)
            }, 1000)
          }
        } catch (err) {
          const { data } = err.response;
          setSuccessMessage(null)
          setErrorMessage(data.message);
        }
      }

    return (
        <>
            {redirectOnDelete && <Redirect to='/gallery' />}
            <section>
                {successMessage && (<FormSuccess text={successMessage} />)}
                {errorMessage && (<FormError text={errorMessage} />)}
                <div className="detail_card">
                    <div className="detail_content">
                        <div className="image">
                            <img src={product.imageUrl} alt="Detail Banner" />
                            <div className="detail_title">{product.title}</div>
                            <div className="detail_price">{product.price}</div>
                        </div>
                        <div className="detail_item">
                            <p>{product.description}</p>
                            <div className="quantity">
                                <label htmlFor="">Quantity</label>
                                <input type="number" value="1" name="quantity" readOnly/>
                            </div>
                            <div className="quantity">
                                <label htmlFor="">Product Id</label>
                                <input type="text" value={product._id} name="productId"/>
                            </div>
                            <div>
                                <Link to={`/update/${id}`}>
                                    <button className="update_btn">Update</button>
                                </Link>
                                <button onClick={() => handleDelete(product)} className="delete_btn">Delete</button>     
                            </div>
                        </div>
                        <button className="order_btn"
                        onClick={() => history.push(`/orders/${product._id}`)}
                        >ORDER NOW</button>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Details;