import express from "express";
import multer from "multer";
import { uploadImage, deleteImage, createImage, avatarImage, commentImage, getDataImage, postDataImage, listComment, testVPS } from "../controller/image.controller.js";
import { project } from "../configs/middlewares/protect.middleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/",testVPS)

router.get("/data", getDataImage)

router.post("/listImgUser", postDataImage)

router.post("/upload", upload.single("image"), uploadImage);

router.delete("/delete",deleteImage);

router.post("/create", createImage);

router.post("/avatar", upload.single("avatar"), avatarImage);

router.post("/comment", commentImage);

router.post("/list-comment", listComment)

export default router;
