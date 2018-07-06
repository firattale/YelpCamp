// configure dotenv
require('dotenv').config();

var express           = require("express");
var app               = express();
var bodyParser        = require("body-parser");
var mongoose          = require("mongoose");
var flash             = require("connect-flash");
var passport          = require("passport");
var LocalStrategy     = require("passport-local");
var Campground        = require("./models/campground");
var Comment           = require("./models/comment");
var User              = require("./models/user");
var methodOverride    = require("method-override");
var seedDB            = require("./seeds");

// requiring routes
var indexRoutes       = require("./routes/index");
var campgroundRoutes  = require("./routes/campgrounds");
var commentRoutes     = require("./routes/comments");

mongoose.connect("mongodb://localhost/yelp_camp_v10");
app.use (bodyParser.urlencoded({extended:true }));
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