import express from "express";
import {
  createDestination,
  getAllDestinations,
  getSingleDestination,
  updateDestination,
  deleteDestination,
} from "../controllers/destinationController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// PUBLIC
router.get("/", getAllDestinations);
router.get("/:id", getSingleDestination);

// ADMIN
router.post("/", auth, createDestination);
router.put("/:id", auth, updateDestination);
router.delete("/:id", auth, deleteDestination);

export default router;