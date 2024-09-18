"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // Import Link from next/link

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log(formData);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '100vh', 
      background: 'linear-gradient(to right, #e0f7fa, #80deea)', // Soft gradient background
    }}>
      <form 
        onSubmit={handleSubmit}
        style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '10px',
          width: '300px',
          backgroundColor: '#ffffff', // White background for the form
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)', // Slightly larger shadow
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Login</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#800000', color: 'white', border: 'none', borderRadius: '5px' }}>
          Login
        </button>
        <p style={{ marginTop: '10px', textAlign: 'center', color: '#666' }}>
          Don't have an account? <Link href="/blogs" style={{ color: '#800000', textDecoration: 'underline' }}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
