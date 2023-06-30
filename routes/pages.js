const express = require('express');
const router = express.Router();

// GET
// => localhost:3000/
router.route('/')
  .get((req, res) => {
    return res.render('pages/index.html');
  });

module.exports = router;
