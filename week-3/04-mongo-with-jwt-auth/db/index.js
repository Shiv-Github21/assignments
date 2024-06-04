const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Shiv21:Shivendra21@cluster0.qnee4pj.mongodb.net/courses_selling_app');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
   username:String,
   password:String,
   PurchasedCourses:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Course'
   }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description:String,
    imageLink:String,
    Price:String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}