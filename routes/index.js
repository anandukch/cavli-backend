import Router from "express";
const router = Router();
import multer, { memoryStorage } from "multer";
import { uploadFile, listAllFiles, getFile, addAwsConfig } from "../controllers/index.js";
const storage = memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/files", listAllFiles);
router.get("/:id", getFile)
router.post("/login",addAwsConfig)
  
export default router;
