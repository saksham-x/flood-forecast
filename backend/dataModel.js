const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  datetime: Date,
  trisuliStage: Number,
  budigandakiStage: Number,

  trishuli_discharge: Number,
  trishuli_meanVelocity: Number,
  trishuli_timeLag: Number,

  budigandaki_discharge: Number,
  budigandaki_meanVelocity: Number,
  budigandaki_timeLag: Number,

  targetedDatetime: Date,
  suirenitar_by_trishuli: Number,

  targetedDatetime2: Date,
  suirenitar_by_budigandaki: Number,

  suirenitar_discharge: Number,
});
const ApiRiverData =
  mongoose.models.ApiRiverData || mongoose.model("ApiRiverData", dataSchema);

const pastTrishuliSchema = new mongoose.Schema({
  targetedDatetime: { type: Date, required: true },
  suirenitar_by_trishuli: { type: Number, required: true },
});

const PastTrishuliData =
  mongoose.models.PastTrishuliData ||
  mongoose.model("PastTrishuliData", pastTrishuliSchema);

module.exports = { ApiRiverData, PastTrishuliData };
