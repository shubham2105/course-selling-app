const { CourseModel } = require("../models/Course");
const { purchaseModel } = require("../models/Purchase");

const purchaseCourse = async (req, res)=>{
    try {
        const {courseId} = req.params;
    const course = await CourseModel.findById(courseId);
    if(!course){
        return res.status(404).json({
            message:"Course not found"
        })
    };
    const existingPurchase = await purchaseModel.findOne({
        userId: req.userId,
        courseId
    })
     if(existingPurchase){
        return res.status(409).json({
            message:"Course already purchased"
        })
    }
   const purchase = await purchaseModel.create({
    userId:  req.userId,
    courseId
   })
   await purchase.populate("courseId")
    return res.status(201).json({
        message:"Course purchased sucessfully",
        purchase:{
            title: purchase.courseId.title,
            description: purchase.courseId.description,
            price: purchase.courseId.price
        }
    })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

const myCourses = async (req, res)=>{
   try {
    const purchases = await purchaseModel.find({
        userId: req.userId
    }).populate("courseId");
    const courses = purchases.map(
        purchase => purchase.courseId
    );
    return res.status(200).json({
            courses
    });
   } catch (error) {
    console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
   
}

module.exports={
    purchaseCourse,
    myCourses
}