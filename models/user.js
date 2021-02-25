const getDB = require('../util/database').getDB;
const mongodb = require('mongodb');
class User{
  constructor(username, email, cart, id){
    this.username= username;
    this.email= email;
    this.cart = cart;
    this._id = id;
  }

  save(){
    const db = getDB();
    return db.collection('users').insertOne(this);
  }

  addToCart(product){
    
    const cartProductIndex = this.cart.items.findIndex(theProduct =>{
      console.log('ID', theProduct.proudctID );
      console.log('ID2', product._id );
      return theProduct.proudctID === product._id;
    });
    console.log('index',cartProductIndex);
    let newQuantity= 1;
    const updatedItems = [...this.cart.items];
    console.log('updatedItems', updatedItems);
    if(cartProductIndex >= 0){
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedItems[cartProductIndex].quantity = newQuantity;
    }else{
      product.push({ proudctID: new mongodb.ObjectId(product._id) , quantity : newQuantity });
    }
    const updateCart = {items : updatedItems};
    const db = getDB();
    return db.collection('users').updateOne({_id : new mongodb.ObjectId(this._id)}, {$set: {cart: updateCart}})
  }

   static userById(userId){
    const db = getDB();
    return db.collection('users').findOne({_id : new mongodb.ObjectId(userId)});
  }
}

  module.exports = User;