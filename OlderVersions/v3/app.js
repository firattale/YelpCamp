const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res) {
	res.render("landing");
});

// SCHEMA SETUP

//   INDEX - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", { campgrounds: allCampgrounds });
		}
	});
});

// CREATE - ADD NEW CAMPGROUND TO DB
app.post("/campgrounds", function(req, res) {
	// get data from form and add to campgrounds array
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	const newCampground = { name: name, image: image, description: desc };
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

// NEW - SHOW FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

// SHOW -SHOWS MORE INFO ABOUT A CAMPGROUND
app.get("/campgrounds/:id", function(req, res) {
	// find the campground with provided ID
	Campground.findById(req.params.id)
		.populate("comments")
		.exec(function(err, foundCampground) {
			if (err) {
				console.log(err);
			} else {
				console.log(foundCampground);
				// render show template with that campground
				res.render("show", { campground: foundCampground });
			}
		});
});

// Tell express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function() {
	console.log("YelpCamp has started!!!");
});
