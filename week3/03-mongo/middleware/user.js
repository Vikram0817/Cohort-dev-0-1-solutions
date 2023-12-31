let { User } = require("../db/index");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. 
    // Check readme for the exact headers to be expected
    let {username, userpassword: password} = req.headers;
    let user = await User.findOne({username: username});
    if(user.username === username && user.password === password){
        next();
    }else{
        return;
    }
}

module.exports = userMiddleware;