const routes = require('express').Router();
const multer = require("multer")
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
const upload = multer({ storage: storage });


module.exports = routes;