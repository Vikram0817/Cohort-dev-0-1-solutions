let jwt = require("jsonwebtoken");
const {Admin, Course} = require("../db/index");
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const key = "123456"

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    Admin.create({username, password});
    res.json({message: 'Admin created successfully'});
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    let admin = await Admin.findOne({username});
    if(admin){
        const token = jwt.sign({username, password}, key)
        res.json({ token: token });
    }else{
        res.json({msg: "No such user exist."})
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const {courseId, title, description, price, imageLink, createdBy} = req.body;
    Course.create({courseId, title, description, price, imageLink, createdBy});
    res.json({ message: 'Course created successfully', courseId: courseId });
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.json(courses);
});

module.exports = router;