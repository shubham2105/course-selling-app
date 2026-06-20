const jwt = require("jsonwebtoken")
const adminMiddleware = (req, res, next) =>{
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({
                message: "Token Missing"
            })
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );
        console.log(decoded)
        req.adminId = decoded.adminId;
        next();
    } catch (error) {
        return res.status(401   ).json({
            message: "Invalid Token"
        })
    }
}

module.exports ={
    adminMiddleware 
}