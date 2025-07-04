const mongoose = require("mongoose");
const initData = require("../init/data.js"); // This gives you { data: [...] }
const Listing = require("../models/listing.js");

// ✅ Define the MongoDB connection string
const mongo_url = "mongodb://localhost:27017/wonderlust";

// ✅ Async function to connect to DB
async function main() {
  await mongoose.connect(mongo_url);
}
main()
  .then(() => {
    console.log("✅ Connected to DB");
  })
  .catch((err) => {
    console.log("❌ DB Connection Error:", err);
  });

const initDB = async () => {
  await Listing.deleteMany({});

  // ✅ Use initData.data since it's exported as { data: [...] }
  const listingsWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: "685b681032b0a59a4ffe66db",
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("✅ Data was initialized with owners");
};

initDB();
