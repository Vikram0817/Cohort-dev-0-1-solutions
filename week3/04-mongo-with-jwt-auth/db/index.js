const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ashok9818236898:sCYTAhSkShUhmZeM@cluster0.riwbhae.mongodb.net/CourseAppJWT').then(function() {
    console.log('MongoDb connected Succesfully');
}).catch((err)=>{
    console.log('failed to connect to DB\n', err);
});

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    purchases: [
        {
            courseId: Number,
            title: String
        }
    ]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    courseId: Number,
    title: String,
    description: String, 
    price: Number, 
    imageLink: String,
    createdBy: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}