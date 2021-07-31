const router = require("express").Router();
const upload = require("../utils/multer");
const { formatResponse } = require("../utils/utils");
const {
  createUser,
  getAll,
  deleteUser,
  updateUser,
  getById,
  updatePassword
} = require("../services/userService");

router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    return formatResponse(res, 201, await createUser(req.file.path, req.body));
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to create user" });
  }
});

router.get("/", async (req, res, next) => {
  try {
    return formatResponse(res, 200, await getAll());
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to fetch users" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    return formatResponse(res, 200, await deleteUser(req.params.id));
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to delete user" });
  }
});

router.put("/:id", upload.single("image"), async (req, res, next) => {
  try {
    return formatResponse(
      res,
      200,
      await updateUser(req.params.id, req.file, req.body)
    );
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to update user" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    return formatResponse(res, 200, await getById(req.params.id));
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to fetch user" });
  }
});

router.patch("/:id/updatePassword", async (req, res, next) => {
  try {
    return formatResponse(
      res,
      200,
      await updatePassword(req.params.id, req.body)
    );
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to update password" });
  }
});

module.exports = router;
