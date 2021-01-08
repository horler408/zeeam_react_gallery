const Product = require("../models/product");
const fs = require("fs");


exports.createProduct = (req, res) => {
  const { title, description, price, category, featured, imageUrl} = req.body
  const url = req.protocol + "://" + req.get("host");
  let errors = [];

  if (!title || !description || !price || !category) {
    errors.push({ msg: "Please enter all neccessary fields" });
  }

  if (title.length < 3) {
    errors.push({ msg: "Please enter a valid product name" });
  }

  if (req.file == undefined) {
    errors.push({ msg: "You must choose a file to upload" })
  }

  if (errors.length > 0) {
    return errors
  }else {
    const product = new Product({
      title,
      description,
      //imageUrl: url + "/images/" + req.file.filename,
      price,
      category,
      imageUrl
    });
    if(featured === 'checked') {
      product.featured = true;
    }
    product
      .save()
      .then((inventoryItems) => {
        res.status(200).json({
          message: "Product saved successfully!",
          inventoryItems
        });
      })
      .catch(err => {
        res.status(400).json({
          error: err
        });
      });
  }
};

exports.getAllProduct = (req, res, next) => {
  res.json(res.paginatedResults)
  // Product.find()
  // .select("id title price description imageUrl")
  //   .then(products => {
  //     res.status(200).json(products);
  //   })
  //   .catch(err => {
  //     res.status(400).json({
  //       error: err
  //     });
  //   });
};

exports.getOneProduct = (req, res, next) => {
  Product.findOne({
    _id: req.params.id
  })
    .then(product => {
      res.status(200).json(product);
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
};

exports.editForm = (req, res) => {
    Product.findOne({_id: req.params.id})
    .then(product => {
      res.status(200).json(product)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}
exports.modifyProduct = (req, res) => {
  let product = new Product({ _id: req.params.id });
    product = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      category: req.body.category
    };
 
  Product.updateOne({ _id: req.params.id }, product)
    .then(() => {
      res.status(200).json({
        message: "Product Updated Successfully!"
      });
    })
    .catch(error => {
      res.status(404).json({
        error: error
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id }).then(product => {
    const filename = product.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Product.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted Successfully!",
            product
          });
        })
        .catch(error => {
          res.status(404).json({
            message: "There was a problem deleting the product!" +error
          });
        });
    });
  });
};
exports.deleteItem = (req, res) => {
  Product.deleteOne({ _id: req.params.id })
  .then((deletedItem) => {
    res.status(200).json({
      message: "Deleted Successfully!",
      deletedItem
    });
   })
  .catch(error => {
    res.status(404).json({
      error: error
    });
  })
}  
