const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('Owner route working!');
});

module.exports = router;
