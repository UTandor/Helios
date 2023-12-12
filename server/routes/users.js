const express = require("express");
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFile = path.join(__dirname, 'users.json');

router.get('/', (req, res) => {
  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading users file');
    } else {
      try {
        const users = JSON.parse(data);
        res.json(users);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.status(500).send('Error parsing JSON data');
      }
    }
  });
});

module.exports = router;