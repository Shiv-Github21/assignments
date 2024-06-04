const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {jwt_secret} = require("../config");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
     await User.create({
        username:username,
        password:password
    })
    res.json({
        mssg:"user has been created successfully"
    })
});

router.post('/signin', async(req, res) => {
    
    const username = req.body.username;
    const password =req.body.password;
    
    const user = await User.find({
        username,
        password
      })

    if(user){
        const token = jwt.sign({
            username
        },jwt_secret);
        res.json({
            token
      }) 
    }
});

router.get('/courses', (req, res) => {
   const allcourse = Course.find({})
    .then(function(response){
        res.json({
        courses:response
        })
    })
    console.log(allcourse)
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    //this is
    const username = req.username;
    const courseId =req.params.courseId;
    //if we have given a userMiddleware then correct usrename and password would be in header
    await User.updateOne({
        username: username
    },{
        "$push":{
            PurchasedCourses : courseId
        }
        
    })
    res.json({
        mssg:"Purchased Completed !!"
    })
    console.log(courseId)
    console.log(username)
    
});



router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const username = req.username;
    const user = await User.findOne({
     username :username
    })
    const courseId =await Course.find({
        _id:{
            "$in":user.PurchasedCourses
        }
    });
    res.json({
        courses: courseId
    })
   
});

module.exports = router