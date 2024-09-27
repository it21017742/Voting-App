const Vote = require("../../Models/Vote/voteModel");

exports.createVote = async (req, res) => {
  const { question } = req.body;
  const vote = new Vote({ question, createdBy: req.user.userId });
  await vote.save();
  res.status(201).send(vote);
};

exports.getVotes = async (req, res) => {
  const votes = await Vote.find();
  res.send(votes);
};

exports.vote = async (req, res) => {
  const { VoteId } = req.params;
  const { vote } = req.body;
  const voteDoc = await Vote.findById(VoteId);
  if (vote === "yes") {
    voteDoc.yesVotes += 1;
  } else {
    voteDoc.noVotes += 1;
  }
  await voteDoc.save();
  res.send(voteDoc);
};

exports.getVote = async (req, res) => {
  const { VoteId } = req.params;
  const vote = await Vote.findById(VoteId);
  res.send(vote);
};
