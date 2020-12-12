import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Details ({ history, match }) {
    console.log(match);
    const [product, setProduct] = useState([])
    
    const id = match.params._id
    const url = `http://localhost:3001/api/product/:${id}`

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await Axios.get(url)
                const result = await response.data 
        
                setProduct(result);
              } catch (err) {
                console.log(err);
              }
        }
        getProduct();
    }, [])

    return (
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
                        <div className="update_btn">
                            <Link to={`/update/${id}`}>
                                Update
                            </Link>
                        </div>
                        <div className="delete_btn">
                            <Link to={`/delete/${id}`}>
                                Delete
                            </Link>
                        </div>
                    </div>
                </div>
                <button className="order_btn"
                onClick={() => history.push(`/orders/${product._id}`)}
                >ORDER NOW</button>
            </div>
        </div>

    )
}

export default Details;