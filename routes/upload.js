const express = require("express");
const multer = require("multer");

const uploadRouter = express.Router();

// Storage on server side
const serverstorage = multer.diskStorage({
  // specifying path of file where video will be saved
  destination: (req, file, cb) => {
    cb(null, "../uploads/");
  },
  filename: (req, file, cb) => {
    // replacing blank spaces in the file name
    cb(null, file.originalname.replace(/ /g, "_"));
  },
});

// Limit to 200 MB file size
const upload = multer({
  storage: serverstorage,
  // file size limit to 200mb temporarily
  limits: {
    fileSize: 1024 * 1024 * 200, // 200 MB
  },
}).single("file");

// port which receives the video
uploadRouter.post("/uploadFile",  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.json({
        succes: true,
        filePath: res.req.file.path,
        fileName: res.req.file.fileName,
      });
    });
  }
);

module.exports = uploadRouter;