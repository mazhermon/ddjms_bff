const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const JamSchema = new Schema({
  id: String,
  songname: String,
  songslug: String,
  minilouge: Number,
  mpcseq: Number,
  bpm: Number,
  brutepatch: Number,
  bruteseq: Number,
  delay: String,
  chords: String,
  lyrics: String,
  notes: String,
});

const Jam = mongoose.model("Jam", JamSchema);

module.exports = Jam;
