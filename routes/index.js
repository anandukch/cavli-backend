const router = require("express").Router();
const multer = require("multer");
const { uploadFile, listAllFiles, getFile } = require("../controllers");
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/files", listAllFiles);
router.get("/:id", getFile)

module.exports = router;
