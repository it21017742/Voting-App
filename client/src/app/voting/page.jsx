"use client";
import React, { useState, useEffect } from "react";

function VotingPage() {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [vote, setVote] = useState("");

  useEffect(() => {
    // Fetch polls from the backend
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/votes`)
      .then((response) => response.json())
      .then((data) => setPolls(data));
  }, []);

  const handleVote = async (pollId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vote/${pollId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ vote }),
    });
    if (response.ok) {
      // Fetch updated poll results
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vote/${pollId}`)
        .then((response) => response.json())
        .then((data) => setSelectedPoll(data));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Voting Page</h2>
      {polls.map((poll) => (
        <div
          key={poll._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: "black",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>{poll.question}</h3>
          <div style={{ marginBottom: "10px" }}>
            <label>
              <input type="radio" name={`vote-${poll._id}`} value="yes" onChange={() => setVote("yes")} />
              Yes
            </label>
            <label style={{ marginLeft: "20px" }}>
              <input type="radio" name={`vote-${poll._id}`} value="no" onChange={() => setVote("no")} />
              No
            </label>
          </div>
          <button
            onClick={() => handleVote(poll._id)}
            style={{ padding: "10px 20px", backgroundColor: "#800000", color: "white", border: "none", borderRadius: "5px", fontSize: "16px" }}
          >
            Submit Vote
          </button>
        </div>
      ))}
      {selectedPoll && (
        <div style={{ marginTop: "20px" }}>
          <h3>Results for: {selectedPoll.question}</h3>
          <p>Yes: {selectedPoll.yesVotes}</p>
          <p>No: {selectedPoll.noVotes}</p>
        </div>
      )}
    </div>
  );
}

export default VotingPage;
