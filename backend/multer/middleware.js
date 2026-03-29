import multer from "multer"
import path from "path"
import fs from "fs"

// ---- Image upload (memory storage, 5 MB) ----
const storage = multer.memoryStorage()

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
})

// ---- Video upload (disk storage, 100 MB) ----
const videoDir = path.resolve("uploads/videos")
if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true })

const videoStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, videoDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `video-${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)
  },
})

export const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("video/")) cb(null, true)
    else cb(new Error("Only video files are allowed"), false)
  },
})
