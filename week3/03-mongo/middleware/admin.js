// Middleware for handling auth
let { Admin } = require("../db/index");

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. 
    // Check readme for the exact headers to be expected
        let {adminusername: username, adminpassword: password} = req.headers;
        let admin = await Admin.findOne({username});
        if(admin.username === username && admin.password === password){
            next();
        }else{
            res.json({msg: "username or password is not correct"});
            return;

    }
}

module.exports = adminMiddleware;