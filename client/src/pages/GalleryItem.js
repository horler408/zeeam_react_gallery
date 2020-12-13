import React from 'react';
import { Link } from 'react-router-dom';

export default function Galleries({ product }) {
    return (
        <div className="gallery_items">
            <img src={product.imageUrl} alt={product.title} />
            <div className="title">{product.title.toUpperCase()}</div>
            <div className="price">{product.price}</div>
            <p className="item_order">
                <Link to={`/gallery/${product._id}`}>
                    {product.description}
                </Link>
            </p>
        </div>
    )
}
