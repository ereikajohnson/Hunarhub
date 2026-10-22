
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Allow the server to read JSON data
app.use(express.json());

// Connect the frontend folder
app.use(express.static(path.join(__dirname, "public")));

// Test route
app.get("/api/test", (req, res) => {
    res.json({
        message: "HunarHub backend is working!"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`HunarHub server is running at http://localhost:${PORT}`);
});
