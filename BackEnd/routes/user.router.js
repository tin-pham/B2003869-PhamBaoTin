const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post(`/register`, userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get(`/refresh_token`, userController.refreshToken);
router.post("/info", userController.getUser);

module.exports = router;
