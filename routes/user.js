const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../models/user");
const { formatResponse } = require("../utils/utils");

router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path); // Upload image to cloudinary

    // Create new user
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      birthDate: new Date(req.body.birthDate),
      avatar: result.secure_url,
      cloudinary_id: result.public_id
    });
    await user.save(); // Save user
    return formatResponse(res, 201, user);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to create user" });
  }
});

router.get("/", async (req, res, next) => {
  try {
    let user = await User.find();
    return formatResponse(res, 200, user);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to fetch users" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    await cloudinary.uploader.destroy(user.cloudinary_id); // Delete image from cloudinary
    await user.remove(); // Delete user from db
    return formatResponse(res, 200, user);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to delete user" });
  }
});

router.put("/:id", upload.single("image"), async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    await cloudinary.uploader.destroy(user.cloudinary_id); // Delete image from cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path); // Upload image to cloudinary
    }
    const data = {
      name: req.body.name || user.name,
      avatar: result?.secure_url || user.avatar,
      cloudinary_id: result?.public_id || user.cloudinary_id
    };
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    return formatResponse(res, 200, user);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to update user" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id); // Find user by id
    return formatResponse(res, 200, user);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to fetch user" });
  }
});

module.exports = router;
