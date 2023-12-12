const express = require("express");
const app = express();

// CORS middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Implement login logic using your database or other authentication method

  // Example with a fake user database
  const users = {
    john: { email: "john@example.com", password: "secret123" },
    jane: { email: "jane@example.com", password: "secret456" },
  };

  if (!users[email]) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  const user = users[email];

  if (password !== user.password) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  // Login successful
  // Generate a JWT token and send it in the response
  // ...

  res.json({ success: true, message: "Login successful" });
});

// Signup route
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Implement signup logic using your database or other user management system

  // Example with a fake user database
  const users = {
    john: { email: "john@example.com", password: "secret123" },
    jane: { email: "jane@example.com", password: "secret456" },
  };

  if (users[email]) {
    return res.status(409).json({ success: false, message: "Email already exists" });
  }

  users[email] = { username, email, password };

  // Signup successful
  // ...

  res.json({ success: true, message: "Signup successful" });
});

// ... other routes

// Start the server
app.listen(3001, () => console.log("Server listening on port 3001"));
