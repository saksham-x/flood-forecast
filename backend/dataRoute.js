const express = require("express");
const { ApiRiverData, RiverConstants } = require("./dataModel"); // Import RiverConstants model
const router = express.Router();

// Load constants from the database into memory on startup
const loadConstantsFromDB = async () => {
  const constants = await RiverConstants.find();
  if (constants.length === 0) {
    console.warn("No constants found in the database.");
    return {};
  }
  return constants.reduce((acc, item) => {
    acc[item.name] = {
      threshold: item.threshold,
      multiplier: item.multiplier,
      exponent: item.exponent,
      velocityFactor: item.velocityFactor,
      velocityOffset: item.velocityOffset,
      distance: item.distance,
    };
    return acc;
  }, {});
};

// Cache for constants
let riverConstants = {};

// Load constants when the server starts
(async () => {
  riverConstants = await loadConstantsFromDB();
})();

// Route to fetch river data
router.get("/api/river-data", async (req, res) => {
  try {
    const riverData = await ApiRiverData.find().sort("datetime");
    const total = await ApiRiverData.countDocuments();

    res.status(200).json({
      totalRecords: total,
      data: riverData,
    });
  } catch (error) {
    console.error("Error fetching river data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to fetch constants
router.get("/api/constants", async (req, res) => {
  if (!riverConstants || Object.keys(riverConstants).length === 0) {
    try {
      riverConstants = await loadConstantsFromDB();
    } catch (error) {
      console.error("Error fetching constants from the database:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).json(riverConstants);
});

// Route to update constants
router.post("/api/constants", async (req, res) => {
  const { trishuli, budigandaki } = req.body;

  try {
    if (trishuli) {
      await RiverConstants.findOneAndUpdate(
        { name: "trishuli" },
        { ...trishuli, name: "trishuli" },
        { upsert: true, new: true }
      );
    }
    if (budigandaki) {
      await RiverConstants.findOneAndUpdate(
        { name: "budigandaki" },
        { ...budigandaki, name: "budigandaki" },
        { upsert: true, new: true }
      );
    }

    // Reload constants from the database
    riverConstants = await loadConstantsFromDB();

    res.status(200).json({
      message: "Constants updated successfully",
      riverConstants,
    });
  } catch (error) {
    console.error("Error updating constants in the database:", error);
    res.status(500).json({ message: "Failed to update constants" });
  }
});

module.exports = router;
