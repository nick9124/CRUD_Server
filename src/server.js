const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/posts_route');

const app = express();
const PORT = process.env.PORT || 9000;

// Logging
app.use(morgan('dev'));

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, POST');
    return res.status(200).json({});
  }

  next();
});

// API routes
app.use('/', routes);

// Error handling
app.use((req, res) => {
  const error = new Error('Not Found');
  return res.status(404).json({
    message: error.message,
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
