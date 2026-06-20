const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
const { userRouter } = require("./routes/User");
const { adminRouter } = require("./routes/Admin");
const { courseRouter } = require("./routes/Course");
const { connectDb } = require("./config/db");

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/courses", courseRouter)

connectDb();
const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`)
})