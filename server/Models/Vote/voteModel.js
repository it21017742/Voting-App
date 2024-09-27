const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  question: { type: String, required: true },
  yesVotes: { type: Number, default: 0 },
  noVotes: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
