const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve Frontend Files
app.use(express.static(path.join(__dirname, "public")));

// Sample Recipe Data
const recipes = [
  {
    id: 1,
    name: "Veg Biryani",
    description: "Easy one-pot flavorful rice dish."
  },
  {
    id: 2,
    name: "Masala Dosa",
    description: "Crispy dosa with spicy potato filling."
  },
  {
    id: 3,
    name: "Paneer Butter Masala",
    description: "Rich creamy curry loved by everyone."
  }
];

// API Route
app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

// Single Recipe API
app.get("/api/recipes/:id", (req, res) => {
  const recipe = recipes.find(r => r.id == req.params.id);

  if (!recipe) {
    return res.status(404).json({
      message: "Recipe not found"
    });
  }

  res.json(recipe);
});

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
