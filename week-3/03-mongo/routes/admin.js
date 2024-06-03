const express = require("express");
const adminMiddleware = require("../middleware/admin");
const router = express.Router();
const { Admin, Course } = require("../db");
// Admin Routes
router.post('/signup',  async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

     await Admin.create({
        username : username,
        password : password
    });
    res.json({
        message:"Admin created successfully"
    });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // zod
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    //console.log(newCourse);
    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});


router.get('/courses', adminMiddleware, async(req, res) => {
    // Course.find({})
    //     .then(function(response){
    //         res.json({
    //             Courses:response
    //         })
    //     })  
     
    //i have done Course.find({}) not put anything bez i want all the courses
    const response = await Course.find({});
    res.json({
        Courses: response
    })
});

module.exports = router;