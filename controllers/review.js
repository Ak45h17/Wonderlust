// controllers/review.js

const Listing = require("../models/listing");
const Review = require("../models/review");

// Create Review
module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  await review.save();
  listing.reviews.push(review);
  await listing.save();
  req.flash("success", "New Review created");
  res.redirect(`/listings/${listing._id}`);
};

// Delete Review
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
};
