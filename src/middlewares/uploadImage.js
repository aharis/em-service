import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "data/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "_",
      +Date.now() + path.extname(file.originalname)
    );
  },
});
const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
}).single("image");

export default uploadImage;
