// Middleware for handling auth
let jwt = require("jsonwebtoken")
const key = "123456"
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. 
    // Check readme for the exact headers to be expected
    const {adminusername: username, adminpassword: password} = req.headers;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, key);
    if(decoded.username === username && decoded.password === password){
        next();
    }else{
        res.status(404).json({msg: "Veryfication failed"})
    }
}

module.exports = adminMiddleware;