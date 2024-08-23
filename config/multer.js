const multer = require("multer");

function cloud(allowedTypes) {
    const storage = multer.memoryStorage();

    const cloudUpload = multer({
        storage: storage,
        limits: {
            fileSize: 5 * 1024 * 1024, // 5 MB
        },
        fileFilter: function (req, file, cb) {
            if (!allowedTypes.includes(file.mimetype)) {
                return cb(new Error("File type is not supported"));
            }
            cb(null, true);
        },
    });

    return cloudUpload;
}

module.exports = {
    cloud,
};