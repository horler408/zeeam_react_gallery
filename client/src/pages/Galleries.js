import React from 'react';

export default function Galleries({ product }) {
    return (
        <div className="gallery_items">
            <img src={product.imageUrl} alt={product.title} />
            <div className="title">{product.title.toUpperCase()}</div>
            <div className="price">{product.price}</div>
            <p className="item_order"><a href="/api/product/">{product.description}</a></p>
        </div>
    )
}
