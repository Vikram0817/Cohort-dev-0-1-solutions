let jwt = require("jsonwebtoken")
const key = "123456"
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. 
    // Check readme for the exact headers to be expected
    const {username, userpassword: password} = req.headers;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, key);
    if(decoded.username === username && decoded.password === password){
        next();
    }else{     
        res.status(404).json({msg: "Veryfication failed"})
    }
}

module.exports = userMiddleware;