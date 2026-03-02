import express from "express";
import {
  createDestination,
  getAllDestinations,
  getSingleDestination,
  updateDestination,
  deleteDestination,
} from "../controllers/destinationController.js";

import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// PUBLIC
router.get("/", getAllDestinations);
router.get("/:id", getSingleDestination);

// ADMIN
router.post(
  "/",
  protectAdmin,
  upload.fields([
    { name: "destination_images" },
    { name: "destination_video" },
  ]),
  createDestination
);
router.put("/:id", auth, updateDestination);
router.delete("/:id", auth, deleteDestination);

export default router;