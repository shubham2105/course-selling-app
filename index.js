const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { connectDb } = require("./db");
const { courseRouter } = require("./src/routes/course");
const { userRouter } = require("./src/routes/user");
const adminRouter = require("./src/routes/admin");
const app = express();

//Routing in express, the Express Router -- the ugly way of doing it
// createUserRoutes(app);
// createCourseRoute(app);

const uri = process.env.MONG0DB_URL;
connectDb(uri);

//Routing in express, the Express Router -- the betetrr way of doing it
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);
app.listen(3000);
