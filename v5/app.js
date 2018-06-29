var express        = require("express");
var app            = express();
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var Campground     = require("./models/campground");
var Comment        = require("./models/comment");
var seedDB         = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v5");
app.use (bodyParser.urlencoded({extended:true }));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))
seedDB();

app.get("/", function (req,res) {
    res.render("landing");
});


// SCHEMA SETUP

//   INDEX - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function (req,res) {
    // Get all campgrounds from DB
    Campground.find({},function (err,allCampgrounds) {
        if (err) {
            console.log(err);
                 }   else {
                res.render("campgrounds/index", {campgrounds:allCampgrounds});
                          }
    });
});

// CREATE - ADD NEW CAMPGROUND TO DB
app.post("/campgrounds", function (req,res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    // Create a new campground and save to DB
    Campground.create(newCampground,function (err,newlyCreated) {
        if (err) {
            console.log(err);
        } else{
                // redirect back to campgrounds page
                res.redirect("/campgrounds");
              }
    });
});

// NEW - SHOW FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new", function (req,res) {
    res.render("campgrounds/new");
});

// SHOW -SHOWS MORE INFO ABOUT A CAMPGROUND
app.get("/campgrounds/:id",function (req,res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) 
        {
            console.log(err);
        }else{
            console.log(foundCampground);
             // render show template with that campground
             res.render("campgrounds/show", {campground:foundCampground});
             }
    });
});

// =================
// COMMENT ROUTES
// =================

app.get("/campgrounds/:id/comments/new", function (req,res) {
    // find campground by id
    Campground.findById(req.params.id,function (err,campground) {
        if (err) {
            console.log(err);
        }else {
            res.render("comments/new",{campground:campground});

            }
    });
});

app.post("/campgrounds/:id/comments", function (req,res) {
    // lookup campground using ID
    Campground.findById(req.params.id,function (err,campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment,function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});

// Tell express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function () {
console.log("YelpCamp has started!!!"
)}
);