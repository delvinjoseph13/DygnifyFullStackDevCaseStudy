import mongoose from "mongoose";

const hazardSchema=mongoose.Schema({
lat: Number,
  lon: Number,
  year: Number,
  heatwaveDays: Number,
  droughtDays: Number,
  rainfallEvents: Number
})

const hazardModel=mongoose.model("hazard",hazardSchema);

export default hazardModel;