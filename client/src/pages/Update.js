import React from 'react'

export default function Update() {
    return (
        <div>
            <div class="update_card">
        <%- include('partials/messages'); -%>
        <div class="alert_success"><%= typeof msg != 'undefined' ? msg : '' %></div>
        <form action="/api/product/edit/<%= product._id %>" method="POST" enctype="multipart/form-data">
            <div class="product_id">
                <label for="id">Product Id<span class="red_info"> *</span></label>
                <input type="text" id="id" name="id" required
                value="<%= typeof product != 'undefined' ? product._id : '' %>"
                >
            </div>
            <div class="product_name">
                <label for="title">Title<span class="red_info"> *</span></label>
                <input type="text" id="title" name="title" required
                value="<%= typeof product != 'undefined' ? product.title : '' %>"
                >
            </div>
            <div class="description">
                <label for="description">Description<span class="red_info"> *</span></label>
                <textarea name="description" id="description" cols="30" rows="5" required
                value="<%= typeof product != 'undefined' ? product.description : '' %>"
                >
                </textarea>
            </div>
            <div class="category">
                <select name="category" id="category"
                value=" typeof product != 'undefined' ? product.category : '' %>"
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
                value="<%= typeof product != 'undefined' ? product.price : '' %>"
                >
            </div>
            <div class="product_image">
                <label for="image">Image Upload</label>
                <input type="file" id="image" name="imageUrl">
            </div>
            <button type="submit" class="update_btn">Submit</button>

        </form>
    </div>
        </div>
    )
}
