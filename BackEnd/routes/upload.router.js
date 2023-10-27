const router = require("express").Router();
const uploadController = require("../controllers/upload.controller");

router.post("/upload", uploadController.upload);
router.post("/destroy", uploadController.destroy);

module.exports = router;
