const router = require("express").Router();
const User = require("../models/user");
const { formatResponse } = require("../utils/utils");

router.post("/", async (req, res, next) => {
  try {
    const loginDetails = await User.findOne({
      email: req.body.username,
      password: req.body.password
    });
    if (loginDetails) {
      return formatResponse(res, 200, loginDetails);
    } else {
      return formatResponse(res, 400, { message: "Bad Credentials" });
    }
  } catch (e) {
    console.log(e);
    next({ status: 400, message: "Failed to create user" });
  }
});

module.exports = router;
