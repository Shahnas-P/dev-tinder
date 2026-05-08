const express = require("express");
const { auth } = require("../middlewares/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", auth, (req, res) => {
  return res.status(200).json({ message: "Connection send successfully!" });
});

module.exports = requestRouter;
