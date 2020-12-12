import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { publicFetch } from './../util/fetch';

export default function Details({ history, match }) {
    console.log(match);

    const [product, setProduct] = useState([])
    //const id = match.params._id

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await publicFetch.get(
                  `product`
                );
                setProduct(data);
              } catch (err) {
                console.log(err);
              }
            };

        //getProduct();
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
                        <button className="update_btn"
                        onClick={() => history.push(`/update/${product._id}`)}
                        >Update</button>
                        <button className="delete_btn"
                        onClick={() => history.push(`/delete/${product._id}`)}
                        >Delete</button>
                    </div>
                </div>
                <button className="order_btn"
                onClick={() => history.push(`/orders/${product._id}`)}
                >ORDER NOW</button>
            </div>
        </div>

    )
}
