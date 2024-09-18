require("dotenv").config();  // load environment variables
const express = require("express");
const dbConnect = require("./dbConnect");  // import the dbConnect function

// Initialize the Express app
const app = express();

// Middlewares (if needed)
// app.use(express.json()); // if you want to parse JSON requests

// Connect to the MongoDB database
dbConnect();

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Set the port (using environment variable or default 3001)
const port = process.env.PORT || 3001;

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});