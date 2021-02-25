const express = require('express');
const routes = express.Router();
const path = require('path');
const dirRoot = require('../util/path');

const adminController = require('../controllers/admin');

// /admin/add-product weil wir filterRouter in app.js datei verwenden (/admin)
routes.get( '/add-product', adminController.getAddProduct);


// admin/product weil wir filterRouter in app.js datei verwenden (/admin)
routes.post('/product', adminController.postAddProducts);


 //Get für Product
routes.get('/products', adminController.getProducts);


routes.get('/edit-product/:productId', adminController.getEditProduct);

//POST
routes.post('/edit-product/', adminController.postEditProduct);

routes.post('/delete-product', adminController.deleteProduct);

//routes.post('/', productsController.postAddProducts);



/* routes.get('/product', (req,res,next)=>{
  res.redirect('/');
})
 */


module.exports.routes = routes;
