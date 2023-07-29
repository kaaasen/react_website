const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());

// Set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Absolute file path to the guestbook.json file
const guestbookFilePath = path.join(__dirname, 'guestbook.json');

// GET route to retrieve and sort guestbook entries
app.get('/api/guestbook', (req, res) => {
  fs.readFile(guestbookFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve guestbook entries' });
    } else {
      let entries = [];
      if (data) {
        try {
          entries = JSON.parse(data);
        } catch (error) {
          console.error('Failed to parse guestbook entries:', error);
        }
      }
      entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort entries based on timestamp, newest on top
      res.json(entries);
    }
  });
});

// POST route to add a new guestbook entry
app.post('/api/guestbook', (req, res) => {
  const newEntry = {
    name: req.body.name,
    message: req.body.message,
    timestamp: req.body.timestamp, // Use the timestamp received from the client
  };

  console.log('Received new guestbook entry:', newEntry); // Add console log to display received data

  fs.readFile(guestbookFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add guestbook entry' });
    } else {
      let entries = [];
      if (data) {
        try {
          entries = JSON.parse(data);
        } catch (error) {
          console.error('Failed to parse guestbook entries:', error);
        }
      }
      entries.push(newEntry);

      fs.writeFile(guestbookFilePath, JSON.stringify(entries), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to add guestbook entry' });
        } else {
          console.log('Guestbook entry added successfully:', newEntry); // Add console log to confirm successful entry
          res.json({ message: 'Guestbook entry added successfully' });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
