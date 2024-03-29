const express = require('express');
const router = express.Router();

const productCrtl = require('../controllers/product');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const Product = require('../models/product');
const paginatedResults = require('./../middleware/pagination');

router.get('/', paginatedResults(Product), productCrtl.getAllProduct);
router.post('/', multer, productCrtl.createProduct);
router.get('/:id', productCrtl.getOneProduct);
router.patch('/:id', multer, productCrtl.modifyProduct);
router.get('/update/:id', productCrtl.editForm);

router.delete('/:id', productCrtl.deleteProduct);
//router.post("/:id", productCrtl.deleteItem)

module.exports = router;
