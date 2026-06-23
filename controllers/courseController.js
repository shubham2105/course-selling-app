const { CourseModel } = require("../models/Course");
const { purchaseModel } = require("../models/Purchase");
const { courseSchema, udpateCoursechema } = require("../validators/courseValidation")

const createCourse = async (req, res)=>{
        try {
            const validationResult = udpateCoursechema.safeParse(req.body);
            if(!validationResult.success){
                return res.status(400).json({
                    message: "Invalid inputs",
                    errors: validationResult.error.issues
                })
            };
            const {title, description, price, imageUrl} = validationResult.data
            // get adminId from middleware
            const creatorId = req.adminId
            console.log("req.adminId =", req.adminId);
            if(!creatorId) {
                return res.status(401).json({
                    message: "Unautorized: Admin not found"
                });
            }
            // creating course in DB
            const course = await CourseModel.create({
                title, description, price, imageUrl, creatorId
            });
            // Return Respinse
            return res.status(201).json({
                message: "Course created sucessfully",
                course
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
};

const updateCourse = async (req, res) =>{
    try {
        const {courseId} = req.params;
        // Validating Inputs
        const validationResult = udpateCoursechema.safeParse(req.body);
        if(!validationResult.success){
            return res.status(400).json({
                message: "Invalid Inputs",
                errors: validationResult.error.issues
            })
        }
        // Find Course 
        const course = await CourseModel.findById(courseId);
        if(!course){
            return res.status(404).json({
                message:"Course not found"
            })
        }
        // Check Ownership
        if (course.creatorId.toString()!== req.adminId) 
            return res.status(403).json({
                message:"You can update only your own course"
            })
        // Update
        const updatedCourse = await CourseModel.findByIdAndUpdate(
            courseId,
            validationResult.data,
            {new: true}
        )
        return res.status(200).json({
            message: "Course updated sucessfully",
            course: updatedCourse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const deleteCourse = async (req, res) =>{
    try {
        const {courseId} = req.params;
        //check if course exists
        const course = await CourseModel.findById(courseId);
        if(!course){
            return res.status(404).json({
                message:"Course not found"
            })
        }
        //Ownership access
        if (course.creatorId.toString() !== req.adminId){
            return res.status(403).json({
                message:"You can only delete your own courses"
            })
        }
        await CourseModel.findByIdAndDelete(courseId);
        return res.status(200).json({
            message:"Course deleted Sucessfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

const getAllCourse = async (req, res)=>{
    try {
        const courses = await CourseModel.find();

        return res.status(200).json({
            courses
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
};

const getCourseById = async (req, res)=>{
    try {
        const  {courseId} = req.params
        const course = await CourseModel.findById(courseId);
        if(!course){
            return res.status(404).json({
                message:"Course not found"
            })
        };
        const purhcase = await purchaseModel.findOne({
            userId: req.userId,
            courseId
        })
        const isPurchased = !!purhcase
        return res.status(200).json({
            course,
            isPurchased
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

module.exports={
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourse,
    getCourseById
}