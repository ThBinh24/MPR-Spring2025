const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", todoRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
