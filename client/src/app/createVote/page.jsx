"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function CreatePoll() {
  const [pollData, setPollData] = useState({ question: "", type: "single", answers: [""] });
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUserRole = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.role === "admin") {
          setIsAdmin(true);
        } else {
          router.push("/voting");
        }
      } else {
        router.push("/login");
      }
    };

    fetchUserRole();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPollData({ ...pollData, [name]: value });
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...pollData.answers];
    newAnswers[index] = value;
    setPollData({ ...pollData, answers: newAnswers });
  };

  const addAnswer = () => {
    setPollData({ ...pollData, answers: [...pollData.answers, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pollData),
    });
    if (response.ok) {
      router.push("/voting");
    }
  };

  if (!isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#e0f7fa] to-[#80deea]">
      <form onSubmit={handleSubmit} className="border border-gray-300 p-6 rounded-lg w-full max-w-md bg-white shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Create Poll</h2>
        <div className="mb-4">
          <label className="block text-black mb-2">Question:</label>
          <input
            type="text"
            name="question"
            value={pollData.question}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black mb-2">Type:</label>
          <select name="type" value={pollData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 text-black rounded">
            <option className="text-black" value="single">
              Single Choice
            </option>
            <option className="text-black" value="multiple">
              Multiple Choice
            </option>
          </select>
        </div>
        <div className="mb-4">
          <h3 className="text-black mb-2">Answers:</h3>
          {pollData.answers.map((answer, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
              />
            </div>
          ))}
          <button type="button" onClick={addAnswer} className="w-full p-2 bg-blue-500 text-white rounded mt-2">
            Add Answer
          </button>
        </div>
        <button type="submit" className="w-full p-2 bg-[#800000] text-white rounded mt-4">
          Create Poll
        </button>
      </form>
    </div>
  );
}

export default CreatePoll;
