const express = require('express');
const fs = require('fs')
const path = require('path')
const router = express.Router();

const users = [];
const usersFile = path.join(__dirname, 'users.json')

function readUsersFromFile() {
  try {
    const usersJson = fs.readFileSync(usersFile, 'utf8');
    users.push(...JSON.parse(usersJson));
  } catch (error) {
    // Handle error reading the filex
  }
}

// Read users from file on startup
readUsersFromFile();

function saveUsersToFile(users) {
  const usersJson = JSON.stringify(users, null, 2);
  fs.writeFileSync(usersFile, usersJson, 'utf8');
}

router.get('/register', (req, res) => {
  const { username, password } = req.query;

  const errors = [];

  // Validate username
  if (!username || username.length < 4 || username.length > 12) {
    errors.push('Username must be 4-12 characters long.');
  }

  // Validate password
  if (!password || password.length < 8 || password.length > 20) {
    errors.push('Password must be 8-20 characters long.');
  }

  // Check for existing username
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    errors.push('Username is already taken.');
  }

  // Handle errors
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create new user
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  // Save users to file
  saveUsersToFile(users);

  // Respond with success
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

module.exports = router;
