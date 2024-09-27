"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ ...formData, role: "client" }), // Default role is client
   });
    if (response.ok) {
      router.push("/login");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #80deea)", // Soft gradient background
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
          backgroundColor: "#ffffff", // White background for the form
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)", // Slightly larger shadow
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Register</h2>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ width: "100%", padding: "10px", backgroundColor: "#800000", color: "white", border: "none", borderRadius: "5px" }}
        >
          Register
        </button>
        <p style={{ marginTop: "10px", textAlign: "center", color: "#666" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#800000", textDecoration: "underline" }}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
