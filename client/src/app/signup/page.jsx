"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (!validateEmail(formData.email)) {
      setErrorMessage("Invalid email address");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Entered passwords are different");
      return;
    }

    // Clear error message if validations pass
    setErrorMessage("");

    // Handle sign-up logic here
    console.log(formData);

    setIsSubmitting(true);
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Sign Up</h2>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", color: "#555" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", color: "#555" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", color: "#555" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", color: "#555" }}
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
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", color: "#555" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", color: "#555" }}
            required
          />
        </div>

        {errorMessage && <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{errorMessage}</p>}

        <button
          type="submit"
          style={{ width: "100%", padding: "10px", backgroundColor: "#800000", color: "white", border: "none", borderRadius: "5px" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>

        <p style={{ marginTop: "10px", textAlign: "center", color: "#666" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#800000", textDecoration: "underline" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
