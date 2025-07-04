const mongoose = require("mongoose");
const Review = require("./review");
const { Schema } = mongoose; 

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  country: String,
  image: {
    url: String,
    filename: String
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'], // Only Point allowed
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});

   



listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({
      _id: { $in: listing.reviews }
    });
  }
});


module.exports = mongoose.model("Listing", listingSchema);

