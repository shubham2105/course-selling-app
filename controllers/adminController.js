const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { adminSchema } = require("../validators/adminValidation");
const { AdminModel } = require("../models/Admin");
const signupAdmin = async (req,res) =>{
    try {
         const validationResult = adminSchema.safeParse(req.body);

    if (!validationResult.success){
        return res.status(400).json({
            message: "Invalid input",
            errors: validationResult.error.issues
        })
    };
    const {firstName, lastName, email, password} = req.body;
    const existingAdmin = await AdminModel.findOne({
        email: email
    });
    if(existingAdmin){
        return res.status(409).json({
            message:"Admin already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const admin = await AdminModel.create({
        firstName, 
        lastName,
        email,
        password: hashedPassword
    })
    return res.status(201).json({
        message: "Admin created Sucessfully",
        adminId: admin._id
    })  
}
catch (error) {
        console.log(error)
        return res.status(500).json({
            messag:"Internal Server Error"
        })
    }
}

const loginAdmin = async (req, res)=>{
    try {
        const {email, password} = req.body;
       
    const admin = await AdminModel.findOne({
        email
    })
    if(!admin){
        return res.status(404).json({
            message: "Admin not found"
        })
    }
    const isPasswordCorrect = await bcrypt.compare(
        password, 
        admin.password
    )
    if(!isPasswordCorrect){
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }
    const token = jwt.sign(
        {
            adminId: admin._id
        },
        process.env.JWT_SECRET_KEY
    )
    return res.status(200).json({
        message: "Login Sucessful",
        token
    })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

};

module.exports={
    signupAdmin,
    loginAdmin
}