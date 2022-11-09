const express = require('express');
const tourController = require('./../controllers/tourController')
const tourControllerMiddleware = require('./../controllers/middlewares/tourControllerMiddlewares')
const router = express.Router();

router.route('/')
  .get(tourControllerMiddleware.validatePaginationQueryParameters, tourController.getAllTours)
  .post(tourController.createTour);

router.route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;