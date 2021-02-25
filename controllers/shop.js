const Product = require('../models/products');
const user = require('../models/user');


//const data = [];


exports.getProducts = async(req,res,next)=>{
    Product.fetchAll().then((product)=>{
      console.log('list',product);
      res.render('shop/product-list.ejs', {prods : product ,title : 'Product list', path : '/products', hasProduct : product.length>0});

    }).catch(err =>{
      console.log(err);
    });
   
      res.render('shop/product-list.ejs', {prods : product ,title : 'Product list', path : '/products', hasProduct 
    });

   
 }

 exports.indexProduct = async(req,res,next)=>{
   console.log('index');
  Product.fetchAll().then((product)=>{
    console.log('gh', product);
    res.render('shop/product-list.ejs', {prods : product ,title : 'Shop', path : '/', hasProduct : product.length > 0});
  }).catch(err =>{
    console.log(err);
  });

 }

 exports.getCart = async (req,res,next)=>{
   req.user.getCart()
   .then(cart =>{
     return cart.getProducts()
    })
   .then(cartProducts=>{
       res.render('shop/cart.ejs', {title : 'cart', path : '/cart' , products : cartProducts});
      })
      .catch()
      
    }
  /*     Cart.getCart( async cart =>{
      const products = await Product.fetchAll();
      const cartProducts= [];
      cart =JSON.parse(cart);
    //  console.log(products);
    for( product of products){
      const productFound = cart.products.find(prod => prod.id === product.id);
      if(productFound){
        console.log('2',productFound);
        cartProducts.push({productData: product , qty : productFound.qty });
      }
    }

    res.render('shop/cart.ejs', {title : 'cart', path : '/cart' , products : cartProducts });
  }); */


 exports.postCart = async (req,res,next)=>{
   const prodId = req.body.productId;
   console.log('ID2',prodId);
    Product.findById(prodId).then(product =>{
      return req.user.addToCart(product)
    }).then(result=>{
      console.log(result);
    });

  /*  let fetchedCart;
   let newQuantity = 1;
   req.user.getCart()
   .then(cart=>{
     fetchedCart = cart;
     return cart.getProducts({where : {id : prodId}})
   }).then(products=>{
     let product;
     if(products.length>0){  
        product = products[0];
     }
     
     if(product){
        newQuantity = ++product.cartItem.quantity;
     }
      return Product.findByPk(prodId);

   }).then(product=>{
      return fetchedCart.addProduct(product, {through :{quantity: newQuantity}});
   }).then(()=>{
     res.redirect('/cart');
     
   })
   .catch() */
 }

 exports.deleteCartProduct = async (req,res, next)=>{
   const productId = req.body.productId;
     req.user.getCart().then((cart)=>{
     return cart.getProducts( {where : {id: productId}})
   })
   .then(products=>{
     products[0].cartItem.destroy();
   }).then(()=>{
     res.redirect('/cart');
   })
   .catch(err=>{
     console.log(err);
   })
  
 }

 exports.getProductID = async (req,res,next)=>{
   const prodId = req.params.productId;
   Product.findById(prodId)
   .then((foundProduct)=>{
     res.render('shop/product-detail.ejs',{productElem : foundProduct[0], title: foundProduct[0].title+'...', path : 'shop/products.ejs'} );
     
   }).catch(err=> console.log(err));

  }

   /* 
   Product.findByPk(prodId)
    .then((foundProduct)=>{
      res.render('shop/product-detail.ejs',{productElem : foundProduct, title: 'product detail', path : 'shop/products.ejs'} );
      
    }).catch(err=> console.log(err)); */
   

 

 
 
 
 
 exports.createOrder= (req,res,next)=>{
   let fetchedCart;
   req.user
   .getCart().then(cart =>{
     fetchedCart= cart;
     return cart.getProducts()
    }).then(products=>{ 
      return req.user.createOrder()
      .then(order=>{
        return order.addProducts(products.map(product=>{
          product.orderItem = {quantity : product.cartItem.quantity};
          console.log('fgh', product);
          return product;
        }))
      })
    }).then(()=>{
      //fetchedCart.destroy(); geht auch 
      fetchedCart.setProducts(null);
    }).then(()=>{
      res.redirect('/orders');
    }).catch(err=>{
      console.log(err);
    })
    
}

exports.getOrders = (req,res,next)=>{
  req.user.getOrders({include : ['products']})
  .then(order=>{
  res.render('shop/orders.ejs', {orders : order, title : 'Orders', path : '/orders' });
})
}