// routes/review.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { reviewSchema } = require("../utils/reviewSchema");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, isReviewAuthor } = require("../middleware");
const Listing = require("../models/listing");
const Review = require("../models/review");

// Validation middleware
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(msg, 400);
  }
  next();
};

router.route("/")
  .post(isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    await review.save();
    listing.reviews.push(review);
    await listing.save();
    req.flash("success", "New Review created");
    res.redirect(`/listings/${listing._id}`);
  }));

router.route("/:reviewId")
  .delete(isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
  }));

module.exports = router;
