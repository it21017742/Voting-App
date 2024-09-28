const Vote = require("../../Models/Vote/voteModel");

exports.createVote = async (req, res) => {
  const { question, type, answers } = req.body;
  const formattedAnswers = answers.map((answer) => ({ text: answer }));
  const vote = new Vote({ question, type, answers: formattedAnswers, createdBy: req.user.userId });
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
  const userId = req.user.userId;
  const voteDoc = await Vote.findById(VoteId);

  if (voteDoc.votedBy.includes(userId)) {
    return res.status(403).send({ message: "You have already voted on this poll." });
  }

  if (voteDoc.type === "single") {
    voteDoc.answers = voteDoc.answers.map((answer) => ({
      ...answer,
      votes: answer.text === vote ? (answer.votes || 0) + 1 : answer.votes,
    }));
  } else if (voteDoc.type === "multiple") {
    const votesArray = Array.isArray(vote) ? vote : [vote];
    voteDoc.answers = voteDoc.answers.map((answer) => ({
      ...answer,
      votes: votesArray.includes(answer.text) ? (answer.votes || 0) + 1 : answer.votes,
    }));
  }

  voteDoc.votedBy.push(userId);

  await voteDoc.save();
  res.send(voteDoc);
};

exports.getVote = async (req, res) => {
  const { VoteId } = req.params;
  const vote = await Vote.findById(VoteId);
  res.send(vote);
};

exports.deleteVote = async (req, res) => {
  const { VoteId } = req.params;
  await Vote.findByIdAndDelete(VoteId);
  res.status(204).send();
};

exports.getVoteResults = async (req, res) => {
  const { VoteId } = req.params;
  console.log(`Fetching results for VoteId: ${VoteId}`);
  const vote = await Vote.findById(VoteId);
  if (!vote) {
    console.log(`Vote not found for VoteId: ${VoteId}`);
    return res.status(404).send({ message: "Vote not found" });
  }
  res.send(vote);
};
