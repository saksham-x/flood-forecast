const { ApiRiverData, PastTrishuliData } = require("./dataModel");

let pastTrishuliData = [];

const roundToNearestFiveMinutes = (date) => {
  date.setSeconds(0);
  date.setMilliseconds(0);
  let minutes = date.getMinutes();
  let roundedMinutes = Math.floor(minutes / 10) * 10;
  if (roundedMinutes % 10 === 0) {
    roundedMinutes -= 5;
  }
  date.setMinutes(roundedMinutes);
  return date;
};

const calculateDischarge = (stage, threshold, multiplier, exponent) => {
  return stage > threshold
    ? multiplier * Math.pow(stage - threshold, exponent)
    : null;
};

const calculateMeanVelocity = (discharge, factor, offset) => {
  return discharge ? factor * discharge + offset : null;
};

const calculateTimeLag = (meanVelocity, distance) => {
  return meanVelocity ? distance / (meanVelocity * 60) : null;
};

const loadPastTrishuliData = async () => {
  try {
    const data = await PastTrishuliData.find();
    pastTrishuliData = data.map((item) => ({
      targetedDatetime: new Date(item.targetedDatetime),
      suirenitar_by_trishuli: item.suirenitar_by_trishuli,
    }));
    console.log("Loaded pastTrishuliData from database.");
  } catch (error) {
    console.error("Error loading pastTrishuliData:", error);
  }
};

const savePastTrishuliData = async (record) => {
  try {
    const existingRecord = await PastTrishuliData.findOne({
      targetedDatetime: record.targetedDatetime,
    });
    if (!existingRecord) {
      await PastTrishuliData.create(record);
      console.log("Saved pastTrishuliData to database:", record);
    } else {
      console.log("Duplicate pastTrishuliData found. Skipping save.");
    }
  } catch (error) {
    console.error("Error saving pastTrishuliData:", error);
  }
};

const processData = async (filteredData) => {
  if (!filteredData || filteredData.length === 0) {
    console.error("No data provided to process.");
    return;
  }

  await loadPastTrishuliData();

  const datetime = filteredData[0].waterLevel.datetime;

  let trisuliStage = null;
  let budigandakiStage = null;

  let trishuli_discharge = null;
  let budigandaki_discharge = null;

  let trishuli_meanVelocity = null;
  let budigandaki_meanVelocity = null;

  let trishuli_timeLag = null;
  let budigandaki_timeLag = null;

  let targetedDatetime = null;
  let targetedDatetime2 = null;

  let suirenitar_by_budigandaki = null;
  let suirenitar_by_trishuli = null;
  let suirenitar_discharge = null;

  filteredData.forEach((item) => {
    if (item.id === 451) {
      trisuliStage = item.waterLevel.value;
      trishuli_discharge = calculateDischarge(
        trisuliStage,
        365.6,
        174.033420951409,
        1.23635884471447
      );
      trishuli_meanVelocity = calculateMeanVelocity(
        trishuli_discharge,
        0.002,
        1.142
      );
      trishuli_timeLag = calculateTimeLag(trishuli_meanVelocity, 30000);

      if (trishuli_timeLag) {
        targetedDatetime = new Date(
          new Date(datetime).getTime() + trishuli_timeLag * 60 * 1000
        );
        targetedDatetime = roundToNearestFiveMinutes(targetedDatetime);
        suirenitar_by_trishuli = trishuli_discharge;

        pastTrishuliData.push({ targetedDatetime, suirenitar_by_trishuli });

        // Save to PastTrishuliData
        savePastTrishuliData({ targetedDatetime, suirenitar_by_trishuli });
      }
    } else if (item.id === 452) {
      budigandakiStage = item.waterLevel.value;
      budigandaki_discharge = calculateDischarge(
        budigandakiStage,
        332,
        417.1536,
        0.36303508
      );
      budigandaki_meanVelocity = calculateMeanVelocity(
        budigandaki_discharge,
        0.002851381701,
        0.646
      );
      budigandaki_timeLag = calculateTimeLag(budigandaki_meanVelocity, 18500);

      if (budigandaki_timeLag) {
        targetedDatetime2 = new Date(
          new Date(datetime).getTime() + budigandaki_timeLag * 60 * 1000
        );
        targetedDatetime2 = roundToNearestFiveMinutes(targetedDatetime2);
        suirenitar_by_budigandaki = budigandaki_discharge;
      }
    }

    const matchingTrisuliData = pastTrishuliData.find(
      (data) => data.targetedDatetime.getTime() === targetedDatetime2?.getTime()
    );

    suirenitar_discharge = matchingTrisuliData
      ? matchingTrisuliData.suirenitar_by_trishuli + suirenitar_by_budigandaki
      : null;
  });

  const saveRiverData = async () => {
    try {
      const existingData = await ApiRiverData.findOne({ datetime });
      if (existingData) {
        Object.assign(existingData, {
          trishuli_discharge,
          trishuli_meanVelocity,
          trishuli_timeLag,
          targetedDatetime,
          suirenitar_by_trishuli,
          budigandaki_discharge,
          budigandaki_meanVelocity,
          budigandaki_timeLag,
          targetedDatetime2,
          suirenitar_discharge,
        });
        await existingData.save();
        console.log("Data already exists. Updated successfully.");
        return;
      }

      const newRiverData = new ApiRiverData({
        datetime,
        trisuliStage,
        trishuli_discharge,
        trishuli_meanVelocity,
        trishuli_timeLag,
        budigandakiStage,
        budigandaki_discharge,
        budigandaki_meanVelocity,
        budigandaki_timeLag,
        targetedDatetime,
        suirenitar_by_trishuli,
        targetedDatetime2,
        suirenitar_by_budigandaki,
        suirenitar_discharge,
      });

      await newRiverData.save();
      console.log("Data saved successfully.");
    } catch (err) {
      console.error("Error saving data to the database:", err);
    }
  };

  await saveRiverData();
};

module.exports = { processData };
