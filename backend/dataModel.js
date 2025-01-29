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

const ApiRiverData = mongoose.model("ApiRiverData", dataSchema);

module.exports = ApiRiverData;
