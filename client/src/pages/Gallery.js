import React, { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/react'
import { Link } from 'react-router-dom';
import { publicFetch } from './../util/fetch';

const cssLoader = css`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%)
  transition: all 0.3s linear;
`;

export default function Gallery() {
    
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const[category, setCategory] = useState("");
    const[page, setPage] = useState(1);

    const endpoint = `product?page=${page}&limit=4&category=${category}`

    useEffect(() => {
        const getProducts = async () => {
          try {
            setLoading(true)
            const { data } = await publicFetch.get(endpoint);
            setProducts(data.results);
            setLoading(false)
          } catch (err) {
            console.log(err);
          }
        };
    
        getProducts();
      }, [endpoint]);

    /*useEffect(() => {
        const getResource = async () => {
            const response = await Axios.get(endpoint);
            const result = await response.data
            console.log(result);
            setProducts(result)
        }
        getResource()
    }, [endpoint])*/

    return (
      <>
        <div className="gallery_container">
          <div style={{display: "flex"}}>
            <div className="select">
                <select name="category" id="select" onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select by category</option>
                <option value="fabrics">Fabrics</option>
                <option value="clothes">Clothes</option>
                <option value="shoes">Shoes</option>
                <option value="bags">Bags</option>
                <option value="ornaments">Ornaments</option>
                </select>
            </div>
              <div>
              {page > 1 ? (
                <button className="nav-btn" onClick={() => setPage(page - 1)}>Prev Page</button>
              ) : ""}
              {page !== (page.length - 1) ? (
                <button className="nav-btn" onClick={() => setPage(page + 1)}>Next Page</button>
              ) : ""}
              </div>
              <div className="gallery-page">Page {page}</div>
          </div>
            <div className="gallery_info"></div>
               
            <div className="gallery_contents">
              <RingLoader css={cssLoader} loading={loading} size={100} />
                {products.map(product => (
                    <div className="gallery_items" key={product._id} >
                      <img src={product.imageUrl} alt={product.title} />
                      <div className="title">{product.title.toUpperCase()}</div>
                      <div className="price">{product.price}</div>
                      <p className="item_order">
                        <Link to={`/gallery/${product._id}`}>
                          click to order
                        </Link>
                      </p>
                    </div>   
                ))}
            </div>
        </div>
      </>
    )
}
