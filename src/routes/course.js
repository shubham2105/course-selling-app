const { Router } = require("express");

const courseRouter = Router();
courseRouter.post("/purchase", (req, res) => {
  res.json({ message: "endpoint to purchase a course" });
});

courseRouter.get("/preview", (req, res) => {
  res.json({ message: "endpoint to preview a course" });
});

module.exports = {
  courseRouter: courseRouter,
};
