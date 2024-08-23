const express = require("express");
const router = express.Router();
const { cloud } = require("../../../../config/multer");
const controller = require("../../../../controllers/media.controllers");

// Sesuaikan allowedTypes dengan jenis file yang diizinkan
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Sesuaikan sesuai kebutuhan

// Menggunakan cloud function dengan allowedTypes
const cloudUpload = cloud(allowedTypes);

router.post("/images", cloudUpload.single('file'), controller.uploadImage);
router.get("/images", controller.getImages);
router.get("/images/:id", controller.getImageDetails);
router.delete("/images/:id", controller.deleteImage);
router.put("/images/:id", cloudUpload.single('file'), controller.updateImage);

module.exports = router;
