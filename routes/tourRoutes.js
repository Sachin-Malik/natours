const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require ('./../routes/reviewRoutes')

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/tour-stats')
  .get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

// Mounting a router
router.use('/:tourId/reviews',reviewRouter);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('lead-guide', 'admin'),
    tourController.deleteTour
  );

  //this route is regarding reviews so, it should be handled in review Controller.
// router
//     .route('/:tourId/review')
//     .post(authController.protect,authController.restrictTo('user'),reviewController.createReview)
    
module.exports = router;
