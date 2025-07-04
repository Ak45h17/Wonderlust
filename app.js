if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


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
// const MongoStore = require('connect-mongo');

// ✅ Define the MongoDB connection string
// const mongo_url = "mongodb://127.0.0.1:27017/wonderlust";
const DbUrl= process.env.ATLASDB_URL;


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


const store = MongoStore.create({
    mongoUrl:DbUrl,
    crypto:{
        secret:process.env.SECREAT,
    },
    touchAfter:24*3600,
});
store.on("error",()=>{
    console.log("error in mongo session",err);
})
const sessionOption = {
    store,
    secret: process.env.SECREAT,   
    resave: false,
    saveUninitialized: true ,
    cookie :{
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // expires after 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000,                          // valid for 7 days
        httpOnly: true
    }     
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 







 //set view engine
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));





//middleware for cookies 
app.use((req, res, next) => {
   res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error"); // ✅ Fix: define error flash message
  next();
});




app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/",userRoutes);





// // ✅ Root route
// app.get("/", (req, res) => {
//     res.send("Hi, I am root.");
// });

app.get("/", (req, res) => {
  res.redirect("/listings"); 
});

//handle error(midleware)
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
 res.status(statusCode).render("Error", { err });
});


// ✅ Start the server
app.listen(8080, () => {
    console.log("🚀 Server is running on port 8080");
});
