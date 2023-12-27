let { Router } = require("express");
const userMiddleware = require("../middleware/user");
let {User, Course} = require("../db/index");
const router = Router();

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    let {username, userpassword: password} = req.headers;
    User.create({username, password});
    res.json({message: "User created successfully"})
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({}).then(courses => {
            res.json(courses);
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const {username, userpassword: password} = req.headers;
    const id = req.params.courseId;
    const course = await Course.findOne({courseId: id});

    await User.updateOne(
        {username}, 
        {
            $push: {
                purchases: {
                    id: id, 
                    title: course.title
                }
            }
        }
    );
    res.json({ message: 'Course purchased successfully' })

});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const {username, userpassword: password} = req.headers;
    User.findOne({username, password}).then((courses) => {
        res.json(courses["purchases"]);
    })

});

module.exports = router;
