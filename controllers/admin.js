const Product = require('../models/products');
const Cart = require('../models/cart');

const mongodb = require('mongodb');
const objectId = mongodb.ObjectId;


exports.getAddProduct = (req,res,next)=>{

  // C ejs
  res.render('admin/edit-product.ejs', {title: 'Add-product', path : '/admin/add-product', editMode: false});
  
}


exports.postAddProducts= (req,res,next)=>{
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title,imageUrl,price, description, null, req.user._id);
  console.log('pop',product);
  return product.save()
  .then(result => {
    //console.log(result);
    res.redirect('/');
  }).catch( err =>{
    console.log(err);
  })


  //data.push({productName : req.body.product});
}

exports.getProducts = async(req,res,next)=>{
  Product.fetchAll()
  .then((product)=>{
    res.render('admin/products.ejs', {prods : product ,title : 'shop', path : '/admin/products', hasProduct : product.length > 0 });

  })
  .catch(err=>{
    console.log(err);
  })
}



 exports.getEditProduct = async(req,res,next)=>{

  const editMode = req.query.edit;
  if(!editMode){
    return  res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then((products)=>{
    return product = products[0];
  })
  .then(product=>{
    res.render('admin/edit-product.ejs', {title: 'Edit product', path : '/admin/edit-product', editMode : true, product : product});
   
  }).catch(err=>{
    console.log(err);
  })
  
  console.log(editMode);
} 

exports.postEditProduct = async(req,res,next)=>{
  const prodId = req.body.productId;
  console.log(prodId);
  const productId = prodId;
  const productTitle = req.body.title;
  const productImage = req.body.imageUrl;
  const productPrice = req.body.price;
  const productDescription = req.body.description;
    const product = new Product(productTitle,productImage,productPrice, productDescription, productId);

    return product.save().then(()=>{
    console.log('updated');
    res.redirect('/admin/products');
  })
  .catch( err =>{
    console.log(err);
  });




}

exports.deleteProduct = async (req,res,next)=>{

  const prodId = req.body.productId;
  console.log(prodId);
  Product.deleteById(prodId)
  .then(()=>{
    res.redirect('/');
    
  })
  .catch(err => console.log(err))

}