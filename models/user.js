const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  }
});

// ✅ This line is essential
userSchema.plugin(passportLocalMongoose);

// ✅ This must be capital `User`
module.exports = mongoose.model("User", userSchema);
