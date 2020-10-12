const express = require("express");
const multer = require("multer");
const path = require("path"); 

const uploadRouter = express.Router();

// Storage on server side
const serverstorage = multer.diskStorage({
  // specifying path of file where video will be saved
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    // replacing blank spaces in the file name
    cb(null, file.originalname.replace(/ /g, "_"));
  },
});

const upload = multer({storage: serverstorage}).single("file");

// port which receives the video
uploadRouter.post("/uploadFile",  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.json({ success: false, error: err });
      }
      return res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.fileName,
      });
    });
  }
);

uploadRouter.get("/getFile/:filename", (req, res, next) => {
  res.download(path.join(__dirname, "..", "uploads", req.params.filename));
});

module.exports = uploadRouter;