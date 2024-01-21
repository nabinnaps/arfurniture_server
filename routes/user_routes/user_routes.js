const express=require('express');
const router=express.Router();
const user_controller=require('../../controllers/user_controller/user_controller');
const otp_controller=require('../../controllers/otp_controller/otp_controller');
const multer = require('multer');
const path = require('path');
const auth = require('../../middleware/check_auth');


//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './assets/images/');     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  });


// router.post('/register',async (req,res)=>{
//   // const insert= await prisma.user.create({data: req.body});
//   //   res.json(insert);
// });


// function auth(){
//   let token =req.headers['authorization'] ;
//   token =token.split(' ')[1];
//   j

// }
router.post('/register',user_controller.register);
router.post('/sendOtp',otp_controller.registerWithOTP);
router.post('/login',user_controller.login);
router.post('/newrefereshtoken',user_controller.renewtoken);
router.post('/newrefereshtoken',user_controller.renewtoken);
router.get('/protected',auth,(req,res)=>{
  res.send("Inside protected route");
});

// // Add the route for getting all registered users 
// router.get('/users', checkAuth, user_controller.getAllUsers);

// // Add the route for getting user by ID
// router.get('/users/:id', checkAuth, user_controller.getUserById);

// router.patch('/users/:id', upload.single('userimage'), user_controller.updateUser);

// router.get('/get-user', checkAuth, user_controller.getLoggedInUser );


// router.post('/forget-password', user_controller.forgetpassword);

// router.post('/reset-password', user_controller.resetPassword);
module.exports= router;