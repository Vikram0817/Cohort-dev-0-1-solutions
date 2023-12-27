const { Router } = require("express");
const {Admin, Course} = require('../db/index');
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes

router.post('/signup', (req, res) => {
    // Implement admin signup logic
    let {adminusername: username, adminpassword: password} = req.headers;
    console.log(username, password);
    Admin.create({ username: username, password: password })
    res.json({ message: 'Admin created successfully' });
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    let {adminusername: username} = req.headers;

    let {title, description, price, imgLink, id} = req.body;

    Course.create({id: id, title: title, description: description, price: price, imgLink: imgLink, createdBy: username} )
    res.json({ message: 'Course created successfully', courseId: id });
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    let username = req.headers.adminusername;

    Course.findOne({createdBy: username}).then(data => {
        res.send(data);
    })
});

module.exports = router;