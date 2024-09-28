"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <header className="bg-[#800000] text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigateTo("/")}>
          Voting App
        </div>
        <div className="hidden md:flex space-x-6">
          <button onClick={() => navigateTo("/voting")} className="hover:text-gray-300">
            Voting
          </button>
          <button onClick={() => navigateTo("/results")} className="hover:text-gray-300">
            Results
          </button>
          <button onClick={() => navigateTo("/createVote")} className="hover:text-gray-300">
            Create Poll
          </button>
          <button onClick={() => navigateTo("/manage")} className="hover:text-gray-300">
            Manage Polls
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#800000]">
          <button onClick={() => navigateTo("/voting")} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
            Voting
          </button>
          <button onClick={() => navigateTo("/results")} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
            Results
          </button>
          <button onClick={() => navigateTo("/createVote")} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
            Create Poll
          </button>
          <button onClick={() => navigateTo("/manage")} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
            Manage Polls
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
