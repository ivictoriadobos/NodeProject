const express = require('express');
const fs = require('fs');
const tourController = require('./../controllers/tourController')
const router = express.Router();
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router.route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour);

module.exports = router;