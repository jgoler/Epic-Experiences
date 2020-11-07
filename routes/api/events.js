const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Event = require('../../models/Event');


// @route  POST api/events
// @desc   Register user
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, date, location, category } = req.body;

    try {
      event = new Event({
        name,
        description,
        date,
        location,
        category
      });

      await event.save();

      res.send('Event created');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;