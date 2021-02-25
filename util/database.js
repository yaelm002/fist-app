const mongoDB = require('mongodb');

const MongoClient = mongoDB.MongoClient;


let _db;
const mongoConnect = (callback)=>{
  MongoClient.connect('mongodb+srv://yassine:yaelm22Null4@cluster0.x8jer.mongodb.net/shop?retryWrites=true&w=majority', { useUnifiedTopology: true })
.then(client=>{
  console.log('connected');
  _db= client.db();
  callback()
})
.catch(err=>{
  console.log(err);
  throw err;
})
}

const getDB = ()=>{
  if(_db){
    return _db
  }
  else{
    console.log('no data found');
  }
}

module.exports.mongoConnect = mongoConnect;

module.exports.getDB = getDB;