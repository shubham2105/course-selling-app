const express = require("express");
const { getAllCourse, getCourseById } = require("../controllers/courseController");
const { userMiddleware } = require("../middlewares/userMiddleware");
const courseRouter = express.Router();

courseRouter.get("/", getAllCourse);
courseRouter.get("/:courseId",userMiddleware, getCourseById);

module.exports={
    courseRouter: courseRouter
}