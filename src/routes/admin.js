const { Router } = require("express");

const adminRouter = Router();

adminRouter.post("/login", (req, res) => {
  res.json({
    message: "Admin login ednpoint",
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
