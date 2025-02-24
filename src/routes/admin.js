const { Router } = require("express");
const { z } = require("zod");
const adminRouter = Router();

// Defining Zod Schemas

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

const loginSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters long")
    .regex(
      passwordRegex,
      "Password must contain atleast one upercase letter and one special chracter"
    ),
});

const signupSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters long")
    .regex(
      passwordRegex,
      "Password must contain atleast one upercase letter and one special"
    ),
  email: z.string().email("Invalid email address"),
});

const CourseSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z
    .string()
    .min(30, "description must be at least 30 characters long"),
  price: z.number().positive("Price must be a positive number"),
});

// Admin Routes
adminRouter.post("/login", (req, res) => {
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.errors });
  }
  const { username, password } = parseResult.data;
  res.json({
    message: "Admin login ednpoint",
    username,
  });
});

adminRouter.post("/signup", (req, res) => {
  res.json({
    message: "Admin signup ednpoint",
  });
});

adminRouter.post("/course", (req, res) => {
  res.json({
    message: "course creation endpoint",
  });
});

adminRouter.put("/course", (req, res) => {
  res.json({
    message: "course updation endpoint",
  });
});

adminRouter.get("/course/bulk", (req, res) => {
  res.json({
    message: "fetch all created courses endpoint",
  });
});

module.exports = adminRouter;
