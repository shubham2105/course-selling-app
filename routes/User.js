const express = require("express");
const { signupUser, loginUser } = require("../controllers/userController");
const { userMiddleware } = require("../middlewares/userMiddleware");
const { purchaseCourse, myCourses } = require("../controllers/purchaseController");
const userRouter = express.Router();

userRouter.post("/login", loginUser);

userRouter.post("/signup", signupUser)

userRouter.post("/purchase/:courseId",userMiddleware, purchaseCourse);
userRouter.get("/my-courses",userMiddleware,myCourses); 
module.exports = {
    userRouter: userRouter
}