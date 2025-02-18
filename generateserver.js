const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// Admin Authentication Middleware
const adminMiddleware = (req, res, next) => {
  if (req.headers.authorization !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

// Logging Middleware
const loggingMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// Routes
app.post("/login", loggingMiddleware, (req, res) => res.json({ message: "Login successful" }));
app.post("/signup", loggingMiddleware, (req, res) => res.json({ message: "Signup successful" }));
app.post("/signout", loggingMiddleware, (req, res) => res.json({ message: "Signout successful" }));

app.get("/user", authMiddleware, loggingMiddleware, (req, res) => res.json({ message: "User data" }));
app.get("/admin", authMiddleware, adminMiddleware, loggingMiddleware, (req, res) => res.json({ message: "Admin data" }));

app.get("/home", loggingMiddleware, (req, res) => res.json({ message: "Welcome to Home Page" }));
app.get("/about", loggingMiddleware, (req, res) => res.json({ message: "About us" }));
app.get("/news", loggingMiddleware, (req, res) => res.json({ message: "Latest news" }));
app.get("/blogs", loggingMiddleware, (req, res) => res.json({ message: "Blogs list" }));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start Server
app.listen(3000, () => console.log("Server running on port 3000"));
