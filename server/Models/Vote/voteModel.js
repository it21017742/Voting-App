const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const voteSchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { type: String, enum: ["single", "multiple"], required: true },
  answers: { type: [answerSchema], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  votedBy: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] }, // Track users who have voted
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
