"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function ManagePage() {
  const [polls, setPolls] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const fetchPolls = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/votes`);
      const data = await response.json();
      setPolls(data);
      };
      
    const fetchUserRole = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.role === "admin") {
          setIsAdmin(true);
          fetchPolls();
        } else {
          router.push("/voting");
        }
      } else {
        router.push("/login");
      }
    };



    fetchUserRole();
  }, [router]);

  const handleDelete = async (pollId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vote/${pollId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setPolls(polls.filter((poll) => poll._id !== pollId));
    }
  };

  if (!isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#e0f7fa] to-[#80deea] p-6">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Manage Polls</h2>
        {polls.map((poll) => (
          <div key={poll._id} className="border border-gray-300 p-6 rounded-lg mb-6 bg-white shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-black">{poll.question}</h3>
            <p className="text-sm text-gray-600 mb-4">{poll.type === "single" ? "Single Choice" : "Multiple Choice"}</p>
            <button onClick={() => handleDelete(poll._id)} className="w-full p-2 bg-red-500 text-white rounded mt-4">
              Delete Poll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagePage;
