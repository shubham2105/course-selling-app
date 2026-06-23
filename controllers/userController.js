const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UserModel } = require("../models/User");
const { userSchema } = require("../validators/userValidation");
const { CourseModel } = require("../models/Course");
const { purchaseModel } = require("../models/Purchase");
const User = require("../routes/User");

const signupUser =  async (req, res) =>{
    try {
        const validationResult = userSchema.safeParse(req.body);
        if(!validationResult.success){
            return res.status(400).json({
                message:"Invalid inputs",
                errors: validationResult.error.issues
            })
        }
        const {firstName, lastName, email, password} = validationResult.data;
        //check for existing user 
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message:"User already exists"
            })
            console.log("Existing User", existingUser)
        };
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message:"User created sucessfully",
            userId: user._id
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
};

const loginUser = async (req, res)=>{
  try {
     const {email, password} = req.body;
   // check if user exists
   const user = await UserModel.findOne({email});
    if(!user) {
        return res.status(404).json({
            message:"User not found"
        })
    }
    //compare password 
    const isPasswordCorrect = await bcrypt.compare(
        password, 
        user.password
    );
    if(!isPasswordCorrect){
        return res.status(401).json({
            message:"Invalid Credentials"
        })
    };
    // Generate JWT
    const token = jwt.sign({
        userId: user._id
    },
        process.env.JWT_SECRET_KEY
    );
    return res.status(200).json({
        message:"Login Sucessfull",
        token
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        message:"Internal Server Error"
    })
  }
}
const getProfile = async (req, res) =>{
    try {
        const user = await UserModel.findById(req.userId)
            .select("-password -__v")
        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
// const purchaseCourse = async (req, res)=>{
//     try {
//         const{courseId} = req.params;
//         const course = await CourseModel.findById(courseId);
//         if(!course){
//             return res.status(404).json({
//                 message:"Couse not found"
//             })
//         };
//         const existingPurchase = await purchaseModel.findOne({
//             userId: req.userId,
//             courseId
//         });
//         if(existingPurchase){
//             return res.status(409).json({
//                 message:"Course already purchased"
//             });
//         const purchase = await purchaseModel.create({
//             userId: req.userId,
//             courseId
//         })
//         return res.status(201).json({
//             message:`Course Purchased Sucessfully ${course}`,
//             purchase
//         })
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message:"Internal Server Error"
//         })
//     }
// }
module.exports = {
    signupUser,
    loginUser,
    getProfile
}