import mongoose from "mongoose";

const clickLogSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    index: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  location: {
    country: { type: String, default: "Unknown" },
    region: { type: String, default: "Unknown" },
    city: { type: String, default: "Unknown" },
    isp: { type: String, default: "Unknown" },
  },
  device: {
    type: String,
    default: "Desktop",
  },
  browser: {
    type: String,
    default: "Unknown",
  },
  os: {
    type: String,
    default: "Unknown",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ClickLog = mongoose.model("ClickLog", clickLogSchema);

export default ClickLog;
