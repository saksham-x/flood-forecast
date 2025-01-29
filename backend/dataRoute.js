const express = require("express");
const ApiRiverData = require("./dataModel");
const router = express.Router();

router.get("/api/river-data", async (req, res) => {
  try {
    const riverData = await ApiRiverData.find()
      .select(
        "datetime targetedDatetime suirenitar_by_trishuli targetedDatetime2 suirenitar_by_budigandaki suirenitar_discharge"
      )
      .sort("datetime");

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

module.exports = router;
