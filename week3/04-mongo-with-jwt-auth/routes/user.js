const { Router, json } = require("express");
const {User, Course} = require("../db/index")
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middleware/user");
const key = "123456"

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const {username, password} = req.body;
    User.create({username, password});
    res.json("User created successfully.")
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    const user = await User.findOne({username, password});
    if(user){
        const token = jwt.sign({username, password}, key);
        res.json({token: token})
    }else{
        res.status(404).json({msd: "user dosen't exist."})
    }

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.json(courses);
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const {username, userpassword: password} = req.headers;
    const id = req.params.courseId;
    const course = await Course.findOne({courseId: id});
    await User.updateOne(
        {username}, {
            $push: {
                purchases: {
                    courseId: id, 
                    title: course.title
                }
            }
        }
    )

    res.json({ message: 'Course purchased successfully'})
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const {username, userpassword: password} = req.headers;
    User.findOne({username, password}).then((courses) => {
        res.json(courses["purchases"]);
    })
});

module.exports = router;