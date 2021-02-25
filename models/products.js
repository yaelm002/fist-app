const getDB = require('../util/database').getDB;
const mongodb = require('mongodb');

class Product {
  constructor(title, imageUrl, price, description, id, userId){
    this.title= title;
    this.imageUrl= imageUrl;
    this.price = price;
    this.description = description;
    this._id= id ? new mongodb.ObjectId(id) : null;
    this.userId= userId;
  }


  save(){
    const db = getDB();
    let dbOpt;
    if(this._id){
      dbOpt= db.collection('products').updateOne({_id : this._id}, {$set : this})
    }
    else{
      dbOpt= db.collection('products').insertOne(this);
    }
  return dbOpt.then(result=>{
      console.log(result);
    })
    .catch(err=>{
      console.log(err);
    });
  }
  static fetchAll(){
    const db = getDB();
    return db.collection('products').find().toArray()
    .then(products=>{
      console.log(products);
      return products
    })
    .catch(err=>{
      console.log(err);
    })
  }

  static findById(id){
    const db = getDB();
    return db.collection('products').find({_id:new mongodb.ObjectId(id)}).toArray()
    .then(products=>{
      console.log(products);
      return products
    })
    .catch(err=>{
      console.log(err);
    })
  }

  static deleteById(id){
    const db = getDB();
    return db.collection('products').deleteOne({_id:new mongodb.ObjectId(id)})
    .then(result=>{
      console.log('hmm',result);
    })
    .catch(err=>{
      console.log(err);
    });
  }

}


module.exports = Product;