const express = require('express');
const multer = require('multer');

const authenticate = require('../authenticate');
const uploadRouter = express.Router();

// Storage on server side
const storage = multer.diskStorage({
  // specifying path of file where video will be saved
  destination: (req, file, cb) => {
    cb(null, '../uploads/');
  },
  filename: (req, file, cb) => {
    // replacing blank spaces in the file name
    cb(null, file.originalname.replace(/ /g, '_'));
  },
});

// Limit to 200 MB file size
const upload = multer({
  storage: storage,
  // file size limit to 200mb temporarily
  limits: {
    fileSize: 1024 * 1024 * 200, // 200 MB
  },
}).single('file');


module.exports = uploadRouter;