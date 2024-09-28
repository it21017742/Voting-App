const express = require("express");
const { createVote, getVotes, vote, getVote, deleteVote, getVoteResults } = require("../../Controllers/Vote/voteController");
const router = express.Router();
const authMiddleware = require("../../Middleware/auth");

router.post("/create-vote", authMiddleware, createVote);
router.get("/Votes", getVotes);
router.post("/vote/:VoteId", authMiddleware, vote);
router.get("/Votes/:VoteId", getVote);
router.delete("/vote/:VoteId", authMiddleware, deleteVote);
router.get("/vote-results/:VoteId", getVoteResults);

module.exports = router;
