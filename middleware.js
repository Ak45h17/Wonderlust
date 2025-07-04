const Listing = require("./models/listing");
const Review = require("./models/review");

const middleware = {};

// 🔒 Check if user is logged in
middleware.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create listings");
    return res.redirect("/login");
  }
  next();
};

// 🔁 Pass redirect URL to locals (if set)
middleware.savedRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// 👤 Check if current user is the listing owner
middleware.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You are not authorized to do that.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// ✍️ Check if current user is the review author
middleware.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect(`/listings/${id}`);
  }
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You are not authorized to delete this review.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports = middleware;
