// configure dotenv
require('dotenv').config();

const express           = require("express");
const app               = express();
const compression       = require('compression')
const bodyParser        = require("body-parser");
const mongoose          = require("mongoose");
const flash             = require("connect-flash");
const passport          = require("passport");
const LocalStrategy     = require("passport-local");
const Campground        = require("./models/campground");
const Comment           = require("./models/comment");
const User              = require("./models/user");
const methodOverride    = require("method-override");
const seedDB            = require("./seeds");

// requiring routes
const indexRoutes       = require("./routes/index");
const campgroundRoutes  = require("./routes/campgrounds");
const commentRoutes     = require("./routes/comments");

const url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v10";

mongoose.connect(url);

app.use (bodyParser.urlencoded({extended:true }));
app.use(compression());
app.use(flash());
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.locals.moment = require('moment');
app.use(require("express-session")({
    secret:"Once Again Lemmy is the king of rock",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req,res,next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use('/',indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);

// Tell express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function () {
console.log("YelpCamp has started!!!"
)}
);