const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// Show all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

// Show form to create new listing
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

// Create new listing
module.exports.createListing = async (req, res) => {
  // 1️⃣ Geocode the location
  const geoData = await geocodingClient.forwardGeocode({
    query: `${req.body.listing.location}, ${req.body.listing.country}`,
    limit: 1
  }).send();

  // 2️⃣ Extract coordinates safely
  const geoFeature = geoData.body.features[0];

  if (!geoFeature) {
    req.flash("error", "Location not found. Please enter a valid place.");
    return res.redirect("/listings/new");
  }

  // 3️⃣ Create new listing
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  newListing.image = {
    url: req.file.path,
    filename: req.file.filename
  };

  // ✅ Set GeoJSON geometry
  newListing.geometry = geoFeature.geometry; // { type: 'Point', coordinates: [...] }

  // 4️⃣ Save and redirect
  await newListing.save();
  console.log("✅ Geometry Saved:", geoFeature.geometry);

  req.flash("success", "New listing created!");
  res.redirect(`/listings/${newListing._id}`);
};




// Show single listing
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/show", { listing }); 
};


// Show form to edit
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  res.render("listings/edit", { listing });
};

// Update listing
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
    runValidators: true
  });

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await listing.save();
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${listing._id}`);
};



// Delete listing
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted");
  res.redirect("/listings");
};
