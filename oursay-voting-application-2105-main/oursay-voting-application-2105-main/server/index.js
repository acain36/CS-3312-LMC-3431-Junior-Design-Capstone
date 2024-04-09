const path = require('path');
const cors = require('cors');

require("dotenv").config()
const PORT = process.env.PORT || 3001;

const express = require("express");
const app = express();
app.use(cors())
app.use(express.json());


const db = require("./database/connect");
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
    db.run();
});


app.post('/api/postevent',db.handleEventPost);
app.get('/api/getevent',db.handleEventGetAll);
app.delete('/api/clearData',db.clearSchemas);
app.post('/api/update/:id',db.handleEventUpdate);
app.delete('/api/deleteevent/:id',db.handleEventDelete);
app.post('/api/vote', db.handleStudentVote);

app.post('/api/toggleevent', db.toggleEvent);

app.post('/api/create', db.handleEventCreate);

  // All other GET requests not handled before will return our React app
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Replace the uri string with your connection string.

// if (process.env.NODE_ENV === 'production')

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  //run();
});