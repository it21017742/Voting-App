require("dotenv").config(); // load environment variables
const express = require("express");
const dbConnect = require("./dbConnect"); // import the dbConnect function
const userRoutes = require("./Routes/User/userRoute");
const voteRoutes = require("./Routes/Vote/voteRoute");
const authMiddleware = require("./Middleware/auth");
const cors = require("cors");

// Initialize the Express app
const app = express();
app.use(cors());
// Middlewares
app.use(express.json()); // to parse JSON requests

// Connect to the MongoDB database
dbConnect();

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// User Routes
app.use("/api/users", userRoutes);

// Poll Routes
app.use("/api", voteRoutes);

// Set the port (using environment variable or default 3001)
const port = process.env.PORT || 3001;

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
