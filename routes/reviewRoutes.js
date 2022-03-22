const express = require('express');
const router = express.Router({mergeParams:true});

const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

router
    .route('/getAllReviews')
    .get(reviewController.getAllReviews);

router
    .route('/createReview')
    .post(authController.protect, authController.restrictTo('user'), reviewController.createReview);
    
router
     .route('/:id')
     .get(reviewController.getReview)
     .delete(authController.protect, authController.restrictTo('user'),reviewController.deleteReview)
     .patch(reviewController.updateReview);

module.exports = router;