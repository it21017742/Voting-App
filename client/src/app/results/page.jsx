"use client";
import React, { useState, useEffect } from "react";

function ResultsPage() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPollResults = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/votes`);
      if (response.ok) {
        const data = await response.json();
        setPolls(data);
      }
    };

    fetchPollResults();
  }, []);

  if (polls.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#e0f7fa] to-[#80deea] p-6">
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Voting Results</h2>
        {polls.map((poll) => {
          const answers = poll.answers.map((answer) => answer.text);
          const votes = poll.answers.map((answer) => answer.votes || 0);
          const totalVotes = votes.reduce((acc, curr) => acc + curr, 0);
          const maxVotes = Math.max(...votes);
          const winningChoices = answers.filter((_, index) => votes[index] === maxVotes);
          const userCount = poll.votedBy.length;

          return (
            <div key={poll._id} className="border border-gray-300 p-6 rounded-lg mb-6 bg-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-black">{poll.question}</h3>
              <div className="mb-4">
                {poll.answers.map((answer, index) => (
                  <p key={index} className="text-black">
                    {answer.text}: {answer.votes || 0} votes
                  </p>
                ))}
              </div>
              <div className="text-center text-black">
                <p className="text-lg">Total Votes: {totalVotes}</p>
                <p className="text-lg">Total Users Voted: {userCount}</p>
                <h3 className="text-xl font-semibold">
                  Winning Choice: {winningChoices.join(", ")} ({maxVotes} votes)
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ResultsPage;
