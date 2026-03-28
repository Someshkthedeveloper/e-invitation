import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./confiq/db.js";
import authRoutes from "./router/auth.js";
import invitationRoutes from "./router/invitation.js";
import templateRoutes from "./router/template.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/invitations", invitationRoutes);
app.use("/api/templates", templateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
