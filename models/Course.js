const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    imageUrl:{
        type: String
    },
    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true  
    }
},{
    timestamps: true
});
const CourseModel =mongoose.model("Course", courseSchema)
module.exports={
    CourseModel
}