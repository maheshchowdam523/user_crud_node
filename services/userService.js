const cloudinary = require("../utils/cloudinary");
const User = require("../models/user");

const createUser = async (filePath, payload) => {
  const result = await cloudinary.uploader.upload(filePath); // Upload image to cloudinary

  // Create new user
  let user = new User({
    firstName: payload.firstName,
    lastName: payload.lastName,
    password: payload.password,
    email: payload.email,
    phone: payload.phone,
    birthDate: new Date(payload.birthDate),
    avatar: result.secure_url,
    cloudinary_id: result.public_id,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return await user.save(); // Save user
};

const getAll = async () => await User.find().sort({ updatedAt: -1 });

const deleteUser = async id => {
  let user = await User.findById(id);
  await cloudinary.uploader.destroy(user.cloudinary_id); // Delete image from cloudinary
  return await user.remove(); // Delete user from db
};

const updateUser = async (id, file, payload) => {
  let user = await User.findById(id);
  let result;
  if (file) {
    await cloudinary.uploader.destroy(user.cloudinary_id); // Delete image from cloudinary
    result = await cloudinary.uploader.upload(file.path); // Upload image to cloudinary
  }
  const data = {
    avatar: result?.secure_url || user.avatar,
    cloudinary_id: result?.public_id || user.cloudinary_id,
    updatedAt: new Date(),
    firstName: payload.firstName || user.firstName,
    lastName: payload.lastName || user.lastName,
    password: payload.password || user.password,
    email: payload.email || user.email,
    phone: payload.phone || user.phone,
    birthDate: new Date(payload.birthDate) || user.birthDate
  };
  return User.findByIdAndUpdate(id, data, { new: true });
};

const getById = async id => await User.findById(id);

const updatePassword = async (id, payload) => {
  return User.findByIdAndUpdate(id, { password: payload.password });
};

module.exports = {
  createUser,
  getAll,
  deleteUser,
  updateUser,
  getById,
  updatePassword
};
