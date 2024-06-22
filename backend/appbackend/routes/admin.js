var express = require('express');
var Product =  require('../models/event.js');
var Signup = require('../models/signup.js');
var Feedback = require('../models/feedback.js');
var Contactus = require('../models/contactus.js');
//var Feedback = require('../models/feedback');
/* GET users listing. */
// router.get('/login', function(req, res, next) {
//   res.send('calling from  admin');
// });
 const cors =require('cors');
 let{
  encryptPassword,
  comparePasswords,
  generateJwt,
} = require("../utils/loginutil.js");



var router = express.Router();

router.use(
  cors({

    credentials:true,
    origin : 'http://localhost:3000'

  })
)

router.post('/addproducts', async (req, res) => {
    try {
        let product = await new Product(req.body).save();
        res.json({ message: "Event Registered Successfully",
         data: product, success: true })
    }
    catch (err) {
        res.json({ message: err.message, success: false })
    }
  });
  router.post('/addfeedbacks', async (req, res) => {
    try {
        let product = await new Feedback(req.body).save();
        res.json({ message: "feedback Added Successfully",
         data: product, success: true })
    }
    catch (err) {
        res.json({ message: err.message, success: false })
    }
  });
   
  
  router.get('/productlist', async (req, res) => {
    try {
        const listproduct = await Product.find().exec();
        res.json({ message: 'State DetailProduct Listing', data: listproduct , success: true });
    }
    catch (err) {
        res.json({ message: err.message, success: false })
   
    }
  });
   
   
   
   
  router.post('/updateproduct/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const updateData = req.body; // Assuming you send the updated data in the request body
   
      // Find the product by ID and update it with the new data
      const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
        new: true, // To return the updated product instead of the old one
      }).exec();
   
      if (!updatedProduct) {
        // If the product is not found, return an error response
        return res.status(404).json({ message: 'Product not found', success: false });
      }
   
      res.json({ message: 'Product successfully updated', product: updatedProduct, success: true });
    } catch (err) {
      // Handle any errors during the update process
      res.status(500).json({ message: err.message, success: false });
    }
  });
   
  router.get('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
   
      // Find the product in the database based on the provided ID
      const product = await Product.findById(productId);
   
      if (!product) {
        // If the product with the given ID is not found, return an error response
        return res.status(404).json({ message: 'Product not found', success: false });
      }
   
      // If the product is found, return the product details
      res.json({ message: 'Product details fetched successfully', data: product, success: true });
    } catch (err) {
      // Handle any errors that occur during the process
      res.status(500).json({ message: err.message, success: false });
    }
  });
   
   

   
   

  router.post('/signup',async  (req, res) => {
    try{
      const AdminEmailCheck =
        await Signup.findOne(
          { email: new RegExp(`^${req.body.email}$`, 'i') }).exec();
   
      // console.log(adminEmailChk);
      if (AdminEmailCheck)
        throw new Error('Email already registered');
   
      req.body.password = await encryptPassword(req.body.password);
   
      let admin = await new Signup(req.body).save();
      res.status(200).json({ message: "Admin Register Successfully", data: admin, success: true });
   
      //   await nodemail('contact@jiorooms.com', req.body.email, 'Registration Successfull', "You have been successfully registered")
      //   res.json({ message: 'Admin Registered', success: true });
   
    }
    catch (err) {
      console.error(err);
      if (err.message)
        res.json({ message: err.message, data: err, success: false });
      else
        res.json({ message: 'Error', data: err, success: false });
    }
  })
   
  //   User Register API Close
   
   
  // User Login API Starts Here
   
  router.post('/login', async (req, res) => {
    try {
   
      const admin =
        await Signup.findOne
          ({
            email: new
              RegExp(`^${req.body.email}$`, 'i')
          }).exec();
   
   
      if (!admin)
        throw new Error("You are not registered");
        //toast.success('Invalid details!');
      const checkPassword = await
        comparePasswords(req.body.password, admin.password);
   
      if (!checkPassword)
        throw new Error("Check Your Credentials");
        //toast.success('Invalid details!');
      const token = await generateJwt(Signup._id);
      res.json({ message: 'Logged In', data: token, success: true });
   
    }
    catch (err) {
      console.error(err);
      if (err.message)
        res.json({ message: err.message,  success: false });
      else
        res.json({ message: 'Error',  success: false });
    }
  })

router.post('/addcontactuss', async (req, res) => {
  try {
      let product = await new Contactus(req.body).save();
      res.json({ message: "Message send Successfully",
       data: product, success: true })
  }
  catch (err) {
      res.json({ message: err.message, success: false })
  }
});
 


module.exports = router;