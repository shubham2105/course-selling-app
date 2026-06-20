const express = require("express");
const { signupAdmin, loginAdmin } = require("../controllers/adminController");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { createCourse, updateCourse, deleteCourse } = require("../controllers/courseController");
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/signup",signupAdmin);
adminRouter.post("/courses", adminMiddleware, createCourse);
adminRouter.delete("/courses/:courseId",adminMiddleware, deleteCourse)
adminRouter.put("/courses/:courseId",adminMiddleware, updateCourse)

module.exports = {
    adminRouter
}