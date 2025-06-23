import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updatePreferredLanguage } from "../controllers/chatPreference.controller.js";

const router = express.Router();

router.put("/chat-preferences", protectRoute, updatePreferredLanguage);

export default router;
