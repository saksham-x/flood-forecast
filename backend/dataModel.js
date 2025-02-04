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

const constantsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  threshold: { type: Number, required: true },
  multiplier: { type: Number, required: true },
  exponent: { type: Number, required: true },
  velocityFactor: { type: Number, required: true },
  velocityOffset: { type: Number, required: true },
  distance: { type: Number, required: true },
});
const RiverConstants =
  mongoose.models.RiverConstants ||
  mongoose.model("RiverConstants", constantsSchema);

module.exports = { ApiRiverData, PastTrishuliData, RiverConstants };
