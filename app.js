if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// ✅ Force Node.js to use Google DNS (Fixes querySrv ENOTFOUND MongoDB error)
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRoutes = require("./route/listing.js");
const reviewRoutes = require("./route/review.js");
const userRoutes = require("./route/user.js");

// ✅ Define the MongoDB connection string
const DbUrl = process.env.ATLASDB_URL;

// ✅ Async function to connect to DB
async function main() {
    await mongoose.connect(DbUrl);
}
main()
    .then(() => {
        console.log("✅ Connected to DB");
    })
    .catch((err) => {
        console.log("❌ DB Connection Error:", err);
    });

// ✅ MongoStore Configuration (Fixed typo: SECREAT -> SECRET)
const store = MongoStore.create({
    mongoUrl: DbUrl,
    crypto: {
        secret: process.env.SECRET || "mysupersecretcode",
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("Error in Mongo session store:", err);
});

// ✅ Express Session Configuration (Fixed typo: SECREAT -> SECRET)
const sessionOption = {
    store,
    secret: process.env.SECRET || "mysupersecretcode",   
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // expires after 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000,                          // valid for 7 days
        httpOnly: true
    }     
};

app.use(session(sessionOption));
app.use(flash());

// ✅ Passport Authentication Setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

// ✅ View Engine & Static Setup
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));

// ✅ Flash & User Middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// ✅ Routes
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

// ✅ Root route
app.get("/", (req, res) => {
    res.redirect("/listings"); 
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("Error", { err });
});

// ✅ Start Server
app.listen(8080, () => {
    console.log("🚀 Server is running on port 8080");
});