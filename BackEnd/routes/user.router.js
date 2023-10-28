const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post(`/register`, userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get(`/refresh_token`, userController.refreshToken);
router.post("/info", userController.getUser);
router.post("/add", userController.addCart);
router.post("/delete", userController.deleteItem);
router.post("/deleteAll", userController.deleteAllItem);

module.exports = router;
