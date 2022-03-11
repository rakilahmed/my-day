// REQUIRED DEPENDENCIES
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// App + PORT + Database URL
const app = express();
const PORT = process.env.PORT || 4001;
const CONNECTION_URI = process.env.MONGODB_URI || process.env.DB_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require('./routes/data-routes.js');
app.use(apiRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build'))
  });
}

// Connect to MongoDB -- Local Database
mongoose.connect(
  CONNECTION_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log('Posts DB connection successful!')
);

// Listen to the server
app.listen(PORT, () => console.log(`Listening...http://localhost:${PORT}`));
