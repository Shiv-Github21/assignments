const jsonwebtoken = require("jsonwebtoken");
const {jwt_secret} = require("../config"); //impoted  jwt_secret
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization; //Bearer aassasfdhyfufh]
    const words = token.split(" ");
    const jwt = words[1];
    const decoded_user = jsonwebtoken.verify(jwt ,jwt_secret);
    if(decoded_user.username){
        //imp-->
        req.username = decoded_user.username 
        next();
    }else{
        res.status(403).json({
            mssg:"YOU ARE NOT AUTHERIZED"
        })
    }


}

module.exports = userMiddleware;