import Axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
//import { FetchContext } from './../context/FetchContext';
import publicFetch from './../util/fetch';


export default function Gallery() {
    //const fetchContext = useContext(FetchContext);
    const [products, setProducts] = useState([])

    const baseUrl = process.env.API_URL

    /*useEffect(() => {
        const getProducts = async () => {
          try {
            const { data } = await publicFetch.get(
              'product'
            );
            setProducts(data);
          } catch (err) {
            console.log(err);
          }
        };
    
        getProducts();
      }, [fetchContext]);*/

    useEffect(() => {
        const getResource = async () => {
            const response = await Axios.get(`http://localhost:3001/api/product`);
            const result = await response.data
            console.log(result);
            setProducts(result)
        }
        getResource()
    }, [])

    return (

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
                    <div className="gallery_items">
                        <img src={product.imageUrl} alt={product.title} />
                        <div className="title">{product.title.toUpperCase()}</div>
                        <div className="price">{product.price}</div>
                        <p className="item_order"><a href="/api/product/">{product.description}</a></p>
                    </div>
                ))}
            </div>
        </div>
    )
}
