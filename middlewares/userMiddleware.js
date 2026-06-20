const jwt = require("jsonwebtoken");

const userMiddleware = async (req, res ,next) =>{
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({
                message:"Token Missing"
            })
        };
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        )
        req.userId = decoded.userId;
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
};

module.exports={
    userMiddleware
}