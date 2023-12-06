import Router from "express";
const router = Router();
import multer, { memoryStorage } from "multer";
import { uploadFile, listAllFiles, getFile, addAwsConfig } from "../controllers/index.js";
import { authorizer } from "../middleware/auth.js";
const storage = memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
const upload = multer({ storage: storage });

router.post("/login",addAwsConfig)
router.post("/upload",authorizer, upload.single("file"), uploadFile);
router.get("/files",authorizer, listAllFiles);
router.get("/files/:fileName",authorizer, getFile)

export default router;
