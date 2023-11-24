const express=require('express');
const app=express();
const cors = require('cors');
require('dotenv').config();

var corOptions={
    origin:'http://localhost:8081'
};

// app.use(cors(corOptions));

const useRoute=require('../routes/user_routes/user_routes');
app.use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use('/images', express.static('assets/images'));


app.use('/',useRoute);




// app.use('/',courseCategoryRoutes);
// app.use('/',courseRatingRoutes);







module.exports=app;