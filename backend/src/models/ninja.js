const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
    required: [true, "Coordinates field is required"],
  },
});

// create ninja Schema and Model
const NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  rank: {
    type: String,
    default: "preto",
  },
  available: {
    type: Boolean,
    default: false,
  },
  geometry: GeoSchema,
});

const Ninjas = mongoose.model("ninjas", NinjaSchema);

module.exports = Ninjas;
