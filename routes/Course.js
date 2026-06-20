const express = require("express");
const { getAllCourse, getCourseById } = require("../controllers/courseController");
const courseRouter = express.Router();

courseRouter.get("/", getAllCourse);
courseRouter.get("/:courseId",getCourseById);

module.exports={
    courseRouter: courseRouter
}