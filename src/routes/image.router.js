import express from "express";
import multer from "multer";
import { uploadImage, deleteImage, createImage, avatarImage, commentImage } from "../controller/image.controller.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("image"), uploadImage);

router.delete("/delete", deleteImage);

router.post("/create", createImage);

router.post("/avatar", upload.single("avatar"), avatarImage);

router.post("/comment", commentImage);

export default router;
