// routes/listing.js
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema");
const { isLoggedIn, isOwner } = require("../middleware");
const ListingController = require("../controllers/listing");
const ExpressError = require("../utils/ExpressError");
const multer = require("multer");
const {storage} = require("../cloudConfig");
const upload =multer({storage});

// Validation middleware
const validateListings = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// Index + Create
router.route("/")
  .get(wrapAsync(ListingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"), // ✅ this should be listing[image]
    validateListings,
    wrapAsync(ListingController.createListing)
  );



// New form
router.get("/new", isLoggedIn, ListingController.renderNewForm);

// Show + Update + Delete
router.route("/:id")
  .get(wrapAsync(ListingController.showListing))
  .put(isLoggedIn, isOwner,upload.single("listing[image]"), validateListings, wrapAsync(ListingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(ListingController.deleteListing));

// Edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.renderEditForm));

module.exports = router;
