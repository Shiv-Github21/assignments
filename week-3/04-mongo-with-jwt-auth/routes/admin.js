const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin,Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const {jwt_secret} = require("../config");

// Admin Routes
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
   
    Admin.create({
        username:username,
        password:password
    })
    .then(function(response){
      res.json({
        msg:"Admin created Successfully"
      });
    })
});

router.post('/signin', async(req, res) => {
     
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.find({
      username,
      password
    })
    if(user){
    const token= jwt.sign({
            username
        },jwt_secret);
        res.json({
            token
        })
    }else{
      res.status(411).json({
        mssg:"wrong Admin username and password enter correct credencials"
      })
        
    }   
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description =  req.body.description;
    const imageLink = req.body.imageLink;
    const Price = req.body.Price;
    const courses =await Course.create({
        title:title,
        description:description,
        imageLink:imageLink,
        Price:Price
    })
    res.json({
    courses:courses
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    Course.find({})
    .then(function(response){
        res.json({
        courses:response
        })
    })
});

module.exports = router;

