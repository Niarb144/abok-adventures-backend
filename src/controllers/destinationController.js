import TourDestination from "../models/TourDestination.js";
import Safari from "../models/Safari.js";

// Create a new destination
export const createDestination = async (req, res) => {
  try {
    const destination = await TourDestination.create(req.body);
    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  console.log("BODY:", req.body);
};

// Get all destinations, sorted by creation date (newest first)
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await TourDestination.find().sort({ createdAt: -1 });
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single destination by ID, along with associated safaris
export const getSingleDestination = async (req, res) => {
  try {
    const destination = await TourDestination.findById(req.params.id);

    if (!destination)
      return res.status(404).json({ message: "Destination not found" });

    const safaris = await Safari.find({
      safari_destinations: req.params.id,
    });

    res.json({
      destination,
      safaris,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a destination by ID
export const updateDestination = async (req, res) => {
  try {
    const updated = await TourDestination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Destination not found" });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a destination by ID
export const deleteDestination = async (req, res) => {
  try {
    const deleted = await TourDestination.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Destination not found" });

    res.json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};