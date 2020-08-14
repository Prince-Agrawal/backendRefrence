const fs = require("fs");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const multer = require("multer");
var multerS3 = require("multer-s3");
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET,
});

var uploadFile = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "TESTING_META_DATA!" });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});

module.exports = uploadFile;
