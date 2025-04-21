// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const readline = require('readline');	
const app = express();
const PORT = 3000;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
//very important that will be commited on the master branch
app.get('/get-data', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

//another comment form about route
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'some.html'));
});

//numbers route is very important
app.get('/numbers', (req, res) => {
  const numbers = [];
  const fileStream = fs.createReadStream(path.join(__dirname, 'public', 'numbers.txt'));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    const intValue = parseInt(line.trim(), 10);
    if (!isNaN(intValue)) {
      numbers.push(intValue);
    }
  });

  rl.on('close', () => {
    res.json({ numbers }); // send JSON response
  });

  rl.on('error', (err) => {
    res.status(500).json({ error: 'Failed to read the file' });
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(__dirname);
});

