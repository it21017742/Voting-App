"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function CreatePoll() {
  const [pollData, setPollData] = useState({ question: "" });
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
    setPollData({ ...pollData, [e.target.name]: e.target.value });
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
    <div>
      <h2>Create Poll</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input type="text" name="question" value={pollData.question} onChange={handleChange} required />
        </label>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
}

export default CreatePoll;
