const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware to parse JSON and allow cross-origin requests
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (Ensure MongoDB is running and accessible)
mongoose.connect("mongodb://localhost:27017/user_preferences", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Allow up to 30 seconds to connect
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// User Schema for MongoDB
const userSchema = new mongoose.Schema({
  interests: { type: [String], required: true, maxLength: 3 },
  location: { type: String, required: true },
  languages: { type: [String], required: true, maxLength: 3 },
  expertise: { type: Number, required: true, min: 1, max: 5 },
});

const User = mongoose.model("User", userSchema);

// API route to save user preferences
app.post("/savePreferences", async (req, res) => {
  try {
    const { interests, location, languages, expertise } = req.body;

    // Validate input data
    if (!interests || interests.length > 3) {
      return res.status(400).json({ error: "You can select up to 3 interests." });
    }
    if (!location) {
      return res.status(400).json({ error: "Location is required." });
    }
    if (!languages || languages.length > 3) {
      return res.status(400).json({ error: "You can select up to 3 languages." });
    }
    if (!expertise || expertise < 1 || expertise > 5) {
      return res.status(400).json({ error: "Expertise must be between 1 and 5." });
    }

    // Create and save new user data
    const newUser = new User({ interests, location, languages, expertise });
    await newUser.save();

    res.status(201).json({ message: "Preferences saved successfully!" });
  } catch (error) {
    console.error("Error saving preferences: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// This should be outside of the above route
app.get("/getPreferences", async (req, res) => {
  try {
    const users = await User.find(); // Fetching users from the MongoDB database
    res.status(200).json(users); // Sending the data as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
