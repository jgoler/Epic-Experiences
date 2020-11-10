const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Event = require('../../models/Event');


// @route  POST api/events
// @desc   Register event
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

// @route  GET api/events
// @desc   Gets events
// @access Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/events/event:event_id
// @desc   Get specific event by ID
// @access Public
router.get('/event/:event_id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.event_id);
    //console.log(event);

    if (!event) return res.status(400).json({ msg: 'There is no matching event' });

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/events/:category
// @desc   Get events in a specific category
// @access Public
router.get('/:category', async (req, res) => {
  try {
    const events = await Event.find({ category: req.params.category });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sever Error');
  }
});

/*
router.get('/:date', async (req, res) => {
  try {
    const events = await Event.find({ date: req.params.date });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
*/


module.exports = router;