function VotingPage() {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [votes, setVotes] = useState({});
  const [submittedPolls, setSubmittedPolls] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => setUserId(data._id));
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/votes`)
      .then((response) => response.json())
      .then((data) => setPolls(data));
  }, []);

  const handleVoteChange = (pollId, answer) => {
    setVotes((prevVotes) => {
      const currentVotes = prevVotes[pollId] || [];
      if (currentVotes.includes(answer)) {
        return {
          ...prevVotes,
          [pollId]: currentVotes.filter((a) => a !== answer),
        };
      } else {
        return {
          ...prevVotes,
          [pollId]: [...currentVotes, answer],
        };
      }
    });
  };

  const handleVote = async (pollId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vote/${pollId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ vote: votes[pollId] }),
    });
    if (response.ok) {
      setSubmittedPolls((prev) => [...prev, pollId]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#e0f7fa] to-[#80deea] p-6">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Voting Page</h2>
        {polls.map((poll) => (
          <div key={poll._id} className="border border-gray-300 p-6 rounded-lg mb-6 bg-white shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-black">{poll.question}</h3>
            <p className="text-sm text-gray-600 mb-4">{poll.type === "single" ? "Single Choice" : "Multiple Choice"}</p>
            <div className="mb-4">
              {poll.answers.map((answer, index) => (
                <label key={index} className="block mb-2 text-black">
                  <input
                    type={poll.type === "single" ? "radio" : "checkbox"}
                    name={`vote-${poll._id}`}
                    value={answer.text}
                    onChange={() => handleVoteChange(poll._id, answer.text)}
                    disabled={submittedPolls.includes(poll._id) || poll.votedBy.includes(userId)}
                    className="mr-2"
                  />
                  {answer.text}
                </label>
              ))}
            </div>
            <button
              onClick={() => handleVote(poll._id)}
              className={`w-full p-2 rounded mt-4 ${submittedPolls.includes(poll._id) ? "bg-gray-500" : "bg-[#800000] text-white"}`}
              disabled={submittedPolls.includes(poll._id) || poll.votedBy.includes(userId)}
            >
              {submittedPolls.includes(poll._id) ? "Submitted" : "Submit Vote"}
            </button>
          </div>
        ))}
        {selectedPoll && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-black">Results for: {selectedPoll.question}</h3>
            <p className="text-black">Yes: {selectedPoll.yesVotes}</p>
            <p className="text-black">No: {selectedPoll.noVotes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VotingPage;
