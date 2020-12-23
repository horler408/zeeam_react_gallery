import React, { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/react'
import { Link } from 'react-router-dom';
import { publicFetch } from './../util/fetch';

const cssLoader = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: grid;
  justify-content: center;
  align-items: center;
  visibility: visible;
  z-index: 999;
  transition: all 0.3s linear;
`;

export default function Gallery() {
    
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getProducts = async () => {
          try {
            setLoading(true)
            const { data } = await publicFetch.get(
              'product'
            );
            setProducts(data);
            setLoading(false)
          } catch (err) {
            console.log(err);
          }
        };
    
        getProducts();
      }, []);

    /*useEffect(() => {
        const getResource = async () => {
            const response = await Axios.get(`http://localhost:3001/api/product`);
            const result = await response.data
            console.log(result);
            setProducts(result)
        }
        getResource()
    }, [])*/

    return (
      <>
        <RingLoader css={cssLoader} loading={loading} size={100} />
        <div className="gallery_container">
            <div className="select">
                <select name="category" id="select">
                <option value="">Select by category</option>
                <option value="">Fabrics</option>
                <option value="">Shoes</option>
                <option value="">Bags</option>
                <option value="">Ornaments</option>
                </select>
            </div>
            <div className="gallery_info"></div>
               
            <div className="gallery_contents">
                {products.map(product => (
                    <div className="gallery_items" key={product._id} >
                      <img src={product.imageUrl} alt={product.title} />
                      <div className="title">{product.title.toUpperCase()}</div>
                      <div className="price">{product.price}</div>
                      <p className="item_order">
                        <Link to={`/gallery/${product._id}`}>
                          {product.description}
                        </Link>
                      </p>
                    </div>   
                ))}
            </div>
        </div>
      </>
    )
}
