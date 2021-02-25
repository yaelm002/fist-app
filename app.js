const express = require('express');
const path = require('path');
 
const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop'); 

const errorController = require('./controllers/error');

const connect = require('./util/database').mongoConnect;

const User = require('./models/user');

 


const app = express();

app.set('engine view', 'ejs');
app.set('views', 'views/ejs');


//add static files
app.use(express.static(path.join(__dirname, 'public')));



//const requestMethod= require('./routes');

app.use(express.urlencoded({extended: false}));

app.use((req,res,next)=>{
  User.userById('601692b0f0d9ec3f81391007')
  .then(user=>{
    console.log(user);
    req.user = new User(user.name, user.email, user.cart, user._id);
    console.log('USER',req.user);
    next();
  })
  .catch(err=>{
    console.log(err);
  })

})

// hier (/admin) ist ein filer , also http://localhost:5000/admin/.....

app.use('/admin',adminRoutes.routes);



app.use(shopRoutes.routes);

app.use(errorController.nonFound); 

connect(()=>{
  console.log('coonnn');
  app.listen(5000);
})
