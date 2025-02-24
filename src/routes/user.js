const { Router } = require("express");

const userRouter = Router();
// user signup endpoint
userRouter.post("/signup", (req, res) => {
  res.json({
    message: "user signin endpoint",
  });
});

// user signing endpoint
userRouter.post("/signin", (req, res) => {
  res.json({
    message: "user signup endpoint",
  });
});
// endpoint which fetches all the courses purchased by user
userRouter.post("/purchases", (req, res) => {
  res.json({
    message: "user purchased courses endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
