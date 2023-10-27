const cloudinary = require("cloudinary");
const fs = require("fs");

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

// we will upload image on cloudinary server
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadController = {
  upload: async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded");
      }

      const { img } = req.files;
      if (img.size > 1024 * 1024 * 6) {
        removeTmp(img.tempFilePath);
        return res.status(400).json({ msg: "size ti large" });
      }
      if (img.mimetype !== "image/jpeg" && img.mimetype !== "image/png") {
        removeTmp(img.tempFilePath);
        return res.status(400).json({ msg: "File format is incorrect" });
      }

      return cloudinary.v2.uploader.upload(
        img.tempFilePath,
        { folder: "test" },
        async (err, result) => {
          if (err) throw err;

          removeTmp(img.tempFilePath);

          return res.json({
            public_id: result.public_id,
            url: result.secure_url,
          });
        },
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const { public_id: publicId } = req.body;
      if (!publicId) {
        return res.status(400).json({ msg: "No image Selected" });
      }
      return cloudinary.v2.uploader.destroy(publicId, async (err, result) => {
        if (err) throw err;

        return res.json({ msg: "Deleted Image" });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = uploadController;
