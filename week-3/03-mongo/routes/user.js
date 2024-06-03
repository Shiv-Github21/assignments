//const { Router } = require("express");
const express = require("express");
const userMiddleware = require("../middleware/user");
const router = express.Router();
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");
// User Routes
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username:username,
        password: password
    }).then(function(response){
        res.json({
        msg:"user has been created successfully"
        })   
    })
});

//this will let user see all the courses no pre-checks req
router.get('/courses', (req, res) => {
   Course.find({})
   .then(function(response){
    res.json({
        Course:response
    })
   })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const courseId =req.params.courseId;
    //if we have given a userMiddleware then correct usrename and password would be in header
    const username = req.headers.username;
    await User.updateOne({
        username: username
    },{
        "$push":{
            PurchasedCourses: courseId
        }
    })
    res.json({
        mssg:"Purchased Completed !!"
    })
    
});
router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    //console.log(user.PurchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.PurchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router