const express = require('express');

const shopController = require('../controllers/shop');

const routes = express.Router();





routes.get( '/', shopController.indexProduct);

routes.get( '/products' , shopController.getProducts);

routes.get( '/products/:productId', shopController.getProductID);

routes.post( '/cart', shopController.postCart);
/* 
routes.get( '/cart', shopController.getCart);



routes.post( '/create-order', shopController.createOrder);

routes.post('/cart-delete-item', shopController.deleteCartProduct); */

//routes.get( '/chekout', shopController.getChekout);

//routes.get('/orders', shopController.getOrders);



 module.exports.routes= routes;