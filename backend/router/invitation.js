import express from "express";
import {
  createInvitation,
  getInvitation,
  getUserInvitations,
  updateInvitation,
  uploadImage,
  uploadGalleryPhoto,
  deleteGalleryPhoto,
} from "../controllers/controller.js";
import { upload } from "../multer/middleware.js";
import { protect } from "../multer/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserInvitations);
router.post("/", protect, createInvitation);
router.get("/:slug", getInvitation);
router.put("/:slug", protect, updateInvitation);

router.post("/:slug/upload-image", protect, upload.single("file"), uploadImage);
router.post("/:slug/gallery", protect, upload.single("photo"), uploadGalleryPhoto);
router.delete("/:slug/gallery/:photoId", protect, deleteGalleryPhoto);

export default router;
