const express=require('express');
const app=express();
const cors = require('cors');
require('dotenv').config();
var corOptions={
    origin:'http://localhost:8081'
};

// app.use(cors(corOptions));

const useRoute=require('../routes/user_routes/user_routes');
const productRoute=require('../routes/product_routes/product_routes');
const reviewRoute=require('../routes/product_routes/review_routes');
const categoriesRoute=require('../routes/product_routes/category_routes');
const carItemRoute=require('../routes/cart_routes/cart_routes');
const wishlistItemRoute=require('../routes/wishlist_routes/wishlist_routes');
const manageOrderRoute=require('../routes/manage_order/manage_order');
app.use;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static('public'));

app.use('/products-image', express.static('assets/images/products'));
app.use('/users-image', express.static('assets/images/users'));


app.use('/',useRoute);
app.use('/',productRoute);
app.use('/',reviewRoute);
app.use('/',categoriesRoute);
app.use('/',carItemRoute);
app.use('/',wishlistItemRoute);
app.use('/',manageOrderRoute);










module.exports=app;